const shopSetupService = require("./shopSetup.service");
const httpStatus = require("http-status");

const {
  sendCreateResponse,
  sendDeletionResponse,
  sendErrorResponse,
  sendFetchResponse,
  sendUpdateResponse,
  sendSingleFetchResponse,
} = require("../../../utils/responseHandler");
const { entities } = require("../../../config/constants");

async function getShopSettings(req, res) {
  try {
    const data = await shopSetupService.getShopSettings();

    sendSingleFetchResponse({
      res,
      data,
      entity: entities.shop_setting,
    });
  } catch (error) {
    console.log("err: " + error.message);
    sendErrorResponse({
      res,
      error: data,
      entity: entities.shop_setting,
    });
  }
}
//
async function manageShopSetting(req, res) {
  try {
    const data = await shopSetupService.manageShopSetting(req.body);

    if (data) {
      return res.status(200).json({
        status: "success",
        message: "Shop setting saved successfully.",
        data,
      });
    }
  } catch (error) {
    console.log("err: " + error.message);
    sendErrorResponse({
      res,
      error,
      entity: entities.business_setup,
    });
  }
}
//
module.exports = {
  manageShopSetting,
  getShopSettings,
};
