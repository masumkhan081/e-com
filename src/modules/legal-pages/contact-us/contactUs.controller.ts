import contactUsService from "./contactUs.service";

const {
  sendSingleFetchResponse,
  sendDeletionResponse,
  sendErrorResponse,
  sendUpdateResponse,
} = require("../../../utils/responseHandler");
import { entities } from "../../../config/constants";

export const getContactUs: TypeController = async (req, res) => {
  try {
    const data = await contactUsService.getContactUs();
    sendSingleFetchResponse({
      res,
      data: data[0],
      entity: entities.contact_us,
    });
  } catch (error) {
    console.log("err: " + error.message);
    sendErrorResponse({
      res,
      error: data,
      entity: entities.contact_us,
    });
  }
}
//

export const updateContactUs: TypeController = async (req, res) => {
  try {
    const data = await contactUsService.updateContactUs(req.body);

    sendUpdateResponse({
      res,
      data,
      entity: entities.contact_us,
    });
  } catch (error) {
    console.log("err: " + error.message);
    sendErrorResponse({
      res,
      error: data,
      entity: entities.contact_us,
    });
  }
}

//
export default {
  updateContactUs,
  getContactUs,
};
