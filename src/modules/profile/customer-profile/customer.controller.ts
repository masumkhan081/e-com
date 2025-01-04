import customerService from "./customer.service";
import httpStatus from "http-status";
//
const {
  sendCreateResponse,
  sendDeletionResponse,
  sendErrorResponse,
  sendFetchResponse,
  sendUpdateResponse,
} = require("../../../utils/responseHandler");
import { entities } from "../../../config/constants";
//
export const createCustomer: TypeController = async (req, res) => {
  const data =  await customerService.createCustomer(req.body);
  if (data instanceof Error) {
    sendErrorResponse({ res, error:data, entity: entities.customer });
  } else {
    sendCreateResponse({ res, data, entity: entities.customer });
  }
}

export const getCustomers: TypeController = async (req, res) => {
  const data =  await customerService.getCustomers(req.query);
  if (data instanceof Error) {
    sendErrorResponse({ res, error:data, entity: entities.customer });
  } else {
    sendFetchResponse({ res, data, entity: entities.customer });
  }
}
//
export const updateCustomer: TypeController = async (req, res) => {
  const data =  await customerService.updateCustomer({
    id: req.params.id,
    data: req.body,
  });
  if (data instanceof Error) {
    sendErrorResponse({ res, error:data, entity: entities.customer });
  } else {
    sendUpdateResponse({ res, data, entity: entities.customer });
  }
}
//
export const deleteCustomer: TypeController = async (req, res) => {
  const data =  await customerService.deleteAddress(req.params.id);
  if (data instanceof Error) {
    sendErrorResponse({ res, error:data, entity: entities.customer });
  } else {
    sendDeletionResponse({
      res,
      data,
      entity: entities.customer,
    });
  }
}
//
export default {
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomers,
};
