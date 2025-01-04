import aboutUsService from "./aboutUs.service";
const {
  sendErrorResponse,
  sendSingleFetchResponse,
  sendUpdateResponse,
} = require("../../../utils/responseHandler");
import { entities } from "../../../config/constants";
//
export const getAboutUs: TypeController = async (req, res) => {
  try {
    const data = await aboutUsService.getAboutUs();

    sendSingleFetchResponse({
      res,
      data: data[0],
      entity: entities.about_us,
      is_singular: true,
    });
  } catch (error) {
    console.log("err: " + error.message);
    sendErrorResponse({
      res,
      error: error,
      entity: entities.about_us,
    });
  }
}
//
export const updateAboutUs: TypeController = async (req, res) => {
  try {
    const result = await aboutUsService.updateAboutUs(req.body);

    if (result) {
      return res.status(200).json({
        status: "success",
        message: result.isNew
          ? "About us created successfully."
          : "About us updated successfully.",
        data: result,
      });
    }
    // Handle the case where no result was returned
    return res.status(404).json({
      status: "error",
      message: "About us not found or could not be updated.",
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
  updateAboutUs,
  getAboutUs,
};
