import withdrawSetupService from "./withdrawSetup.service";
const {
  sendErrorResponse,
  sendSingleFetchResponse,
} = require("../../../utils/responseHandler");
import { entities } from "../../../config/constants";

export const manageWithdrawSetting: TypeController = async (req, res) => {
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

export const getWithdrawSetting: TypeController = async (req, res) => {
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
export default {
  manageWithdrawSetting,
  getWithdrawSetting,
};
