import businessSetupService from "./businessSetup.service";
const {
  sendErrorResponse,
  sendFetchResponse,
  sendSingleFetchResponse,
} = require("../../../utils/responseHandler");
import { entities } from "../../../config/constants";
// 

export type TypeController = (req: Request, res: Response) => Promise<void>;


export const manageBusinessSetup: TypeController = async (req, res) => {
  try {
    const data = await businessSetupService.manageBusinessSetup(req.body);

    if (data) {
      return res.status(200).json({
        status: "success",
        message: "Business setup saved successfully.",
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

export const getBusinessSetup: TypeController = async (req, res) => {
  try {
    const data = await businessSetupService.getBusinessSetup(req.query);

    sendSingleFetchResponse({
      res,
      data,
      entity: entities.business_setup,
    });
  } catch (error) {
    console.log("err: " + error.message);
    sendErrorResponse({
      res,
      error: data,
      entity: entities.business_setup,
    });
  }
}
//

export default {
  manageBusinessSetup,
  getBusinessSetup,
};
