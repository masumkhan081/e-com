const withdrawSetupService = require("./withdrawSetup.service");
const {
  sendErrorResponse,
  sendSingleFetchResponse,
} = require("../../../utils/responseHandler");
const { entities } = require("../../../config/constants");

async function manageWithdrawSetting(req, res) {
  try {
    const data = await withdrawSetupService.manageWithdrawSetting(req.body);

    if (data) {
      return res.status(200).json({
        status: "success",
        message: "Withdraw setting saved successfully.",
        data,
      });
    }
  } catch (error) {
    console.log("err: " + error.message);
    sendErrorResponse({
      res,
      error,
      entity: entities.withdraw_setting,
    });
  }
}

async function getWithdrawSetting(req, res) {
  try {
    const data = await withdrawSetupService.getWithdrawSetting(req.query);

    sendSingleFetchResponse({ res, data, entity: entities.withdraw_setting });
  } catch (error) {
    console.log("err: " + error.message);
    sendErrorResponse({
      res,
      error: data,
      entity: entities.withdraw_setting,
    });
  }
}
//
module.exports = {
  manageWithdrawSetting,
  getWithdrawSetting,
};
