import delChargeService from "./delCharge.service";
import httpStatus from "http-status";

const {
  sendCreateResponse,
  sendDeletionResponse,
  sendErrorResponse,
  sendFetchResponse,
  sendUpdateResponse,
} = require("../../../utils/responseHandler");
import { entities } from "../../../config/constants";
//
export const createDeliveryCharge: TypeController = async (req, res) => {
  const data =  await delChargeService.createDeliveryCharge(req.body);
  if (data instanceof Error) {
    sendErrorResponse({
      res,
      error:data,
      entity: entities.delivery_charge,
    });
  } else {
    sendCreateResponse({
      res,
      data,
      entity: entities.delivery_charge,
    });
  }
}

export const getDeliveryCharges: TypeController = async (req, res) => {
  const data =  await delChargeService.getDeliveryCharges(req.query);
  if (data instanceof Error) {
    sendErrorResponse({
      res,
      error:data,
      entity: entities.delivery_charge,
    });
  } else {
    sendFetchResponse({
      res,
      data,
      entity: entities.delivery_charge,
    });
  }
}
//
export const updateDeliveryCharge: TypeController = async (req, res) => {
  const data =  await delChargeService.updateDeliveryCharge({
    id: req.params.id,
    data: req.body,
  });
  if (data instanceof Error) {
    sendErrorResponse({
      res,
      error:data,
      entity: entities.delivery_charge,
    });
  } else {
    sendUpdateResponse({
      res,
      data,
      entity: entities.delivery_charge,
    });
  }
}
//
export const deleteDeliveryCharge: TypeController = async (req, res) => {
  const data =  await delChargeService.deleteDeliveryCharge(req.params.id);
  if (data instanceof Error) {
    sendErrorResponse({
      res,
      error:data,
      entity: entities.delivery_charge,
    });
  } else {
    sendDeletionResponse({
      res,
      data,
      entity: entities.delivery_charge,
    });
  }
}
//
export default {
  createDeliveryCharge,
  updateDeliveryCharge,
  deleteDeliveryCharge,
  getDeliveryCharges,
};
