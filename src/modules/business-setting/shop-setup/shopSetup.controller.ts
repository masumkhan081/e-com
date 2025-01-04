import shopSetupService from "./shopSetup.service";
import httpStatus from "http-status";

const {
  sendCreateResponse,
  sendDeletionResponse,
  sendErrorResponse,
  sendFetchResponse,
  sendUpdateResponse,
  sendSingleFetchResponse,
} = require("../../../utils/responseHandler");
import { entities } from "../../../config/constants";

export const getShopSettings: TypeController = async (req, res) => {
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
export const manageShopSetting: TypeController = async (req, res) => {
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
export default {
  manageShopSetting,
  getShopSettings,
};
