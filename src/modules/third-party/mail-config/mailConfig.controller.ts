import mailConfigService from "./mailConfig.service";

const {
  sendErrorResponse,
  sendSingleFetchResponse,
} = require("../../../utils/responseHandler");
import { entities } from "../../../config/constants";
import mailConfig from "./mailConfig.model";
//

export const getMailConfig: TypeController = async (req, res) => {
  try {
    const data = await mailConfigService.getMailConfig();

    sendSingleFetchResponse({
      res,
      data: data[0],
      entity: entities.mail_config,
      is_singular: true,
    });
  } catch (error) {
    console.log("err: " + error.message);
    sendErrorResponse({
      res,
      error: error,
      entity: entities.mail_config,
    });
  }
}
//
export const updateMailConfig: TypeController = async (req, res) => {
  try {
    const result = await mailConfigService.updateMailConfig(req.body);

    if (result) {
      return res.status(200).json({
        status: "success",
        message: result.isNew
          ? "Mail configuration created successfully."
          : "Mail configuration updated successfully.",
        data: result,
      });
    }

    // Handle the case where no result was returned
    return res.status(404).json({
      status: "error",
      message: "Mail configuration not found or could not be updated.",
    });
  } catch (error) {
    console.log("err: " + error.message);
    sendErrorResponse({
      res,
      error: error, // Use 'error' instead of 'data'
      entity: entities.terms_and_conditions,
    });
  }
}

//
export default {
  updateMailConfig,
  getMailConfig,
};
