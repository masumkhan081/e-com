const paymentGatewayService = require("./paymentGateway.service");
const {
  sendCreateResponse,
  sendDeletionResponse,
  sendErrorResponse,
  sendFetchResponse,
  sendUpdateResponse,
} = require("../../../utils/responseHandler");
const { entities } = require("../../../config/constants");
const { gatewayEnum, PaymentConfig } = require("./paymentGateway.model");
const {
  amarPaySchema,
  bkashSchema,
  payPalSchema,
  payTabsSchema,
  paystackSchema,
  razorpaySchema,
  stripeSchema,
  paymentConfigBaseSchema,
} = require("./paymentGateway.validate");
const validateData = require("../../../middlewares/validateData");
const { fieldsMap, uploadHandler } = require("../../../utils/uploader");
const { removeFile } = require("../../../utils/fileHandle");
//

async function createPaymentGateway(req, res) {
  try {
    const { gateway, ...configData } = req.body;

    // Validate the gateway type
    if (!gatewayEnum.includes(gateway)) {
      return res.status(400).json({
        success: false,
        message: "Invalid gateway",
      });
    }

    // Map the gateway to its discriminator model
    let PaymentConfigModel;
    let schema;

    if (gateway === "STRIPE") {
      PaymentConfigModel = PaymentConfig.discriminators["STRIPE"];
      schema = stripeSchema;
    } else if (gateway === "PAYPAL") {
      PaymentConfigModel = PaymentConfig.discriminators["PAYPAL"];
      schema = payPalSchema;
    } else if (gateway === "RAZORPAY") {
      PaymentConfigModel = PaymentConfig.discriminators["RAZORPAY"];
      schema = razorpaySchema;
    } else if (gateway === "PAYSTACK") {
      PaymentConfigModel = PaymentConfig.discriminators["PAYSTACK"];
      schema = paystackSchema;
    } else if (gateway === "AAMARPAY") {
      PaymentConfigModel = PaymentConfig.discriminators["AAMARPAY"];
      schema = amarPaySchema;
    } else if (gateway === "BKASH") {
      PaymentConfigModel = PaymentConfig.discriminators["BKASH"];
      schema = bkashSchema;
    } else if (gateway === "PAYTABS") {
      PaymentConfigModel = PaymentConfig.discriminators["PAYTABS"];
      schema = payTabsSchema;
    } else {
      throw new Error("Invalid gateway type");
    }

    const isExist = await PaymentConfig.findOne({ gateway });

    if (!isExist) {
      const { success, message, messages } = validateData({
        schema: schema,
        data: req.body,
      });
      if (!success) {
        return res.status(400).json({ success, message, messages });
      }
    }

    //  upload logo
    let fileUrl;
    const fieldName = fieldsMap[entities.payment_gateway][0].name;

    if (req.files?.[fieldName]) {
      fileUrl = await uploadHandler({
        entity: fieldName,
        file: req.files[fieldName][0],
      });
    }

    if (fileUrl && isExist) {
      removeFile({ fileUrl: isExist.logo });
    }

    // Create and save the payment configuration
    if (!isExist) {
      const data = await PaymentConfigModel.create({
        gateway,
        logo: fileUrl,
        ...configData,
      });

      sendCreateResponse({
        res,
        data,
        entity: entities.payment_gateway,
      });
    }
    if (isExist) {
      const data = await PaymentConfigModel.findByIdAndUpdate(isExist._id, {
        logo: fileUrl || isExist.payment_gateway_logo,
        ...configData,
      });

      sendUpdateResponse({
        res,
        data,
        entity: entities.payment_gateway,
      });
    }
  } catch (error) {
    console.log("err: " + error.message);
    sendErrorResponse({
      res,
      error,
      entity: entities.payment_gateway,
    });
  }
}

async function getPaymentGateway(req, res) {
  const data = await paymentGatewayService.getPaymentGateway(req.query);
  if (data instanceof Error) {
    sendErrorResponse({
      res,
      error: data,
      entity: entities.payment_gateway,
    });
  } else {
    sendFetchResponse({
      res,
      data,
      entity: entities.payment_gateway,
    });
  }
}
//
 
async function deletePaymentGateway(req, res) {
  const data = await paymentGatewayService.deletePaymentGateway(req.params.id);
  if (data instanceof Error) {
    sendErrorResponse({
      res,
      error: data,
      entity: entities.payment_gateway,
    });
  } else {
    sendDeletionResponse({
      res,
      data,
      entity: entities.payment_gateway,
    });
  }
}
//
module.exports = {
  createPaymentGateway,
   
  deletePaymentGateway,
  getPaymentGateway,
};
