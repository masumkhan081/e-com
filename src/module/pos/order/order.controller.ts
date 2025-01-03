const orderService = require("./order.service");
const httpStatus = require("http-status");

const {
  sendCreateResponse,
  sendDeletionResponse,
  sendErrorResponse,
  sendFetchResponse,
  sendUpdateResponse,
} = require("../../../utils/responseHandler");
const { entities, allowed_roles } = require("../../../config/constants");
const Order = require("./order.model");
const Customer = require("../../profile/customer-profile/customer.model");
const { generateOTP, getOtpToken } = require("../../../utils/mail");
const config = require("../../../config");
const crypto = require("crypto-js");

//

async function deliveryConfirmation(req, res) {
  try {
    const targetOrderId = req.params.id;
    const targetOrder = await Order.findById(targetOrderId);

    if (!targetOrder) {
      res.status(400).json({
        success: false,
        message: "Target order is missing.",
      });
    }

    const { otp: otp_from_user, token } = req.body;
    const { expireAt, otp: otp_from_token } = JSON.parse(
      crypto.AES.decrypt(token, config.tkn_secret).toString(crypto.enc.Utf8)
    );
    if (otp_from_token !== otp_from_user) {
      return res.status(400).json({
        success: false,
        message: "Invalid token or otp!",
      });
    }
    // if (new Date().getTime() > expireAt) {
    //   return res.status(400).json({ success: false, message: "OTP expired" });
    // }

    const result = await Order.findByIdAndUpdate(
      targetOrderId,
      {
        status: "DELIVERED",
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Order delivered successfully.",
      data: result,
    });
  } catch (error) {
    console.log("error: controller: " + error.message);
    res.status(500).json({
      success: false,
      message: "",
    });
  }
}

//
async function requestDeliveryOtp(req, res) {
  try {
    const updatableId = req.params.id;
    const existingOrder = await Order.findById(updatableId).populate(
      "customer"
    );

    if (!existingOrder) {
      return res.status(400).json({
        success: false,
        message: "Target order doesn't exist.",
      });
    }

    // Step 2: Get the profile_id from the customer object
    const customer_profile_id = existingOrder.customer.profile_id; // Get the profile_id

    // Step 3: Fetch the customer profile using the profile_id
    const customerProfile = await Customer.findById(customer_profile_id);

    const generatedOTP = generateOTP();
    const token = getOtpToken({
      otp: generatedOTP,
      phone: customerProfile.phone,
    });

    res.status(200).json({
      success: true,
      message: `An otp has been sent to ${customerProfile.phone} for confirmation`,
      token,
      otp: generatedOTP,
    });
  } catch (error) {
    res.status(400).json({ message: "Server error." });
  }
}

async function updateOrder(req, res) {
  try {
    const updatableId = req.params.id;
    const existingOrder = await Order.findById(updatableId);
    let update;

    if (!existingOrder) {
      return res.status(400).json({
        success: false,
        message: "Target order doesn't exist.",
      });
    }
    //
    const { role } = req;
    const { status, rider } = req.body;

    if (role === allowed_roles.seller) {
      if (
        ![
          "PROCESSING",
          "CONFIRMED",
          "OUT FOR DELIVERY",
          "CANCELLED",
          "RETURN-RECIEVED",
        ].includes(status)
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid status for seller to update.",
        });
      }
      if (status === "OUT FOR DELIVERY" && !rider) {
        return res.status(400).json({
          success: false,
          message: "Must assign a rider when order is out for delivery.",
        });
      }
      update.rider = rider;
      update.status = status;
    }

    if (req.role === allowed_roles.rider) {
      if (!["OUT FOR DELIVERY", "RETURNED"].includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid status for rider.",
        });
      }
      update.status = status;
      update.rider = req.user_id;
    }

    if (["RETURNED"].includes(status)) {
      update.total_payable = existingOrder.shipping_charge;
    }
    if (status === "RETURN-RECEIVED") {
      for (const item of existingOrder.products) {
        const result_returned_stock_addition = await Product.findOneAndUpdate(
          {
            _id: item.product,
            "variants.size": item.size,
            "variants.color": item.color,
          },
          { $inc: { "variants.$.stock_quantity": item.qty } },
          { new: true }
        );
      }
    }

    const result = await Order.findByIdAndUpdate(updatableId, update, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: getOrderMessage(status),
      data: result,
    });
  } catch (error) {
    res.status(400).json({ success: true, message: "Error updating status" });
  }
}

function getOrderMessage(status) {
  switch (status) {
    case "CONFIRMED":
      return "Your order has been confirmed.";
    case "PROCESSING":
      return "The order is currently being processed.";
    case "OUT FOR DELIVERY":
      return "The order is out for delivery.";
    case "CANCELLED":
      return "The order has been cancelled.";
    case "RETURNED":
      return "The order has been returned.";
    case "RETURN-RECEIVED":
      return "The returned order has been received.";
    default:
      return "The order is updated.";
  }
}

async function getOrders(req, res) {
  try {
    const data = await orderService.getOrders(req.query);
    if (data instanceof Error) {
      sendErrorResponse({ res, error: data, entity: entities.order });
    } else {
      sendFetchResponse({ res, data, entity: entities.order });
    }
  } catch (error) {
    res.status(400).send({ message: "Error fetching orders" });
  }
}

//
async function deleteOrder(req, res) {
  const data = await orderService.deleteOrder(req.params.id);
  if (data instanceof Error) {
    sendErrorResponse({ res, error: data, entity: entities.order });
  } else {
    sendDeletionResponse({ res, data, entity: entities.order });
  }
}
//
module.exports = {
  deleteOrder,
  getOrders,
  updateOrder,
  requestDeliveryOtp,
  deliveryConfirmation,
};
