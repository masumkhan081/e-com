const shippingDeliveryPolicyService = require("./shippingDelivery.service");
const httpStatus = require("http-status");
const {
  sendErrorResponse,
  sendSingleFetchResponse,
} = require("../../../utils/responseHandler");
const { entities } = require("../../../config/constants");

async function getShippingDeliveryPolicy(req, res) {
  try {
    const data =
      await shippingDeliveryPolicyService.getShippingDeliveryPolicy();

    sendSingleFetchResponse({
      res,
      data: data[0],
      entity: entities.shipping_and_delivery_policy,
      is_singular: true,
    });
  } catch (error) {
    console.log("err: " + error.message);
    sendErrorResponse({
      res,
      error: error,
      entity: entities.shipping_and_delivery_policy,
    });
  }
}
//
async function updateShippingDeliveryPolicy(req, res) {
  try {
    const result =
      await shippingDeliveryPolicyService.updateShippingDeliveryPolicy(
        req.body
      );

    if (result) {
      return res.status(200).json({
        status: "success",
        message: result.isNew
          ? "Shipping policy created successfully."
          : "Shipping policy updated successfully.",
        data: result,
      });
    }

    // Handle the case where no result was returned
    return res.status(404).json({
      status: "error",
      message: "Privacy policy not found or could not be updated.",
    });
  } catch (error) {
    sendErrorResponse({
      res,
      error: error, // Use 'error' instead of 'data'
      entity: entities.terms_and_conditions,
    });
  }
}

//
module.exports = {
  updateShippingDeliveryPolicy,
  getShippingDeliveryPolicy,
};
