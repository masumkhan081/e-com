const smsGatewayService = require("./smsGateway.service");
const {
  sendCreateResponse,
  sendDeletionResponse,
  sendErrorResponse,
  sendFetchResponse,
  sendUpdateResponse,
} = require("../../../utils/responseHandler");
const { entities } = require("../../../config/constants");
const { gatewayEnum, SMSConfig } = require("./smsGateway.model");
const { telesignSchema, twilioSchema } = require("./smsGateway.validate");
const validateData = require("../../../middlewares/validateData");

async function manageSMSGateway(req, res) {
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
    let SMSConfigModel;
    let schema;

    if (gateway === "TWILIO") {
      SMSConfigModel = SMSConfig.discriminators["TWILIO"];
      schema = twilioSchema;
    } else if (gateway === "TELESIGN") {
      SMSConfigModel = SMSConfig.discriminators["TELESIGN"];
      schema = telesignSchema;
    }

    const isExist = await SMSConfig.findOne({ gateway });

    if (!isExist) {
      const { success, message, messages } = validateData({
        schema: schema,
        data: req.body,
      });
      if (!success) {
        return res.status(400).json({ success, message, messages });
      }
    }

    // Create and save the payment configuration
    if (!isExist) {
      const data = await SMSConfigModel.create({
        gateway,
        ...configData,
      });

      sendCreateResponse({
        res,
        data,
        entity: entities.payment_gateway,
      });
    }
    if (isExist) {
      const data = await SMSConfigModel.findByIdAndUpdate(isExist._id, {
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

async function getSmsGateway(req, res) {
  const data = await smsGatewayService.getSmsGateway(req.query);
  if (data instanceof Error) {
    sendErrorResponse({
      res,
      error: data,
      entity: entities.sms_gateway,
    });
  } else {
    sendFetchResponse({
      res,
      data,
      entity: entities.sms_gateway,
    });
  }
}
//

//
async function deleteSmsGateway(req, res) {
  try {
    const data = await smsGatewayService.deleteSMSConfig(req.params.id);
    if (data instanceof Error) {
      sendErrorResponse({
        res,
        error: data,
        entity: entities.sms_gateway,
      });
    } else {
      sendDeletionResponse({
        res,
        data,
        entity: entities.sms_gateway,
      });
    }
  } catch (error) {
    console.log("err: " + error.message);
    sendErrorResponse({
      res,
      error,
      entity: entities.sms_gateway,
    });
  }
}
//
module.exports = {
  manageSMSGateway,
  deleteSmsGateway,
  getSmsGateway,
};
