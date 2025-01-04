import termConditionService from "./termCondition.service";
const {
  isPostBodyValid,
  isPatchBodyValid,
} = require("./termCondition.validate");
const {
  sendCreateResponse,
  sendDeletionResponse,
  sendErrorResponse,
  sendFetchResponse,
  sendUpdateResponse,
  sendSingleFetchResponse,
} = require("../../../utils/responseHandler");
import { entities } from "../../../config/constants";
//
export const getTermCondition: TypeController = async (req, res) => {
  try {
    const data = await termConditionService.getTermCondition();

    sendSingleFetchResponse({
      res,
      data: data[0],
      entity: entities.terms_and_conditions,
      is_singular:true
    });
  } catch (error) {
    console.log("err: " + error.message);
    sendErrorResponse({
      res,
      error: error,
      entity: entities.terms_and_conditions,
    });
  }
}
//
export const updateTermCondition: TypeController = async (req, res) => {
  try {
    const result = await termConditionService.updateTermCondition(req.body);

    if (result) {
      return res.status(200).json({
        status: "success",
        message: result.isNew
          ? "Privacy policy created successfully."
          : "Privacy policy updated successfully.",
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
export default {
  updateTermCondition,
  getTermCondition,
};
