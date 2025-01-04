import addressService from "../services/address.service";
import httpStatus from "http-status";

const {
  sendCreateResponse,
  sendDeletionResponse,
  sendErrorResponse,
  sendFetchResponse,
  sendUpdateResponse,
} = require("../utils/responseHandler");
import { entities } from "../config/constants";

export const createSaleReturn: TypeController = async (req, res) => {
  const data =  await addressService.createSaleReturn(req.body);
  if (data instanceof Error) {
    sendErrorResponse({ res, error:data, entity: entities.address });
  } else {
    sendCreateResponse({ res, data, entity: entities.address });
  }
}

export const getAddresses: TypeController = async (req, res) => {
  const data =  await addressService.getAddresses(req.query);
  if (data instanceof Error) {
    sendErrorResponse({ res, error:data, entity: entities.address });
  } else {
    sendFetchResponse({ res, data, entity: entities.address });
  }
}
//
export const updateAddress: TypeController = async (req, res) => {
  const data =  await addressService.updateAddress({
    id: req.params.id,
    data: req.body,
  });
  if (data instanceof Error) {
    sendErrorResponse({ res, error:data, entity: entities.address });
  } else {
    sendUpdateResponse({ res, data, entity: entities.address });
  }
}
//
export const deleteAddress: TypeController = async (req, res) => {
  const data =  await addressService.deleteAddress(req.params.id);
  if (data instanceof Error) {
    sendErrorResponse({ res, error:data, entity: entities.address });
  } else {
    sendDeletionResponse({ res, data, entity: entities.address });
  }
}
//
export default {
  createSaleReturn,
  updateAddress,
  deleteAddress,
  getAddresses,
};
