import TktTypeService from "./tktType.service";
import httpStatus from "http-status";

const {
  sendCreateResponse,
  sendDeletionResponse,
  sendErrorResponse,
  sendFetchResponse,
  sendUpdateResponse,
} = require("../../../utils/responseHandler");
import { entities } from "../../../config/constants";

export const createTktType: TypeController = async (req, res) => {
  const data =  await TktTypeService.createTktType(req.body);
  if (data instanceof Error) {
    sendErrorResponse({
      res,
      error:data,
      entity: entities.ticket_type,
    });
  } else {
    sendCreateResponse({
      res,
      data,
      entity: entities.ticket_type,
    });
  }
}

export const getTktTypes: TypeController = async (req, res) => {
  const data =  await TktTypeService.getTktTypes(req.query);
  if (data instanceof Error) {
    sendErrorResponse({
      res,
      error:data,
      entity: entities.ticket_type,
    });
  } else {
    sendFetchResponse({
      res,
      data,
      entity: entities.ticket_type,
    });
  }
}
//
export const updateTktType: TypeController = async (req, res) => {
  const data =  await TktTypeService.updateTktType({
    id: req.params.id,
    data: req.body,
  });
  if (data instanceof Error) {
    sendErrorResponse({
      res,
      error:data,
      entity: entities.ticket_type,
    });
  } else {
    sendUpdateResponse({
      res,
      data,
      entity: entities.ticket_type,
    });
  }
}
//
export const deleteTktType: TypeController = async (req, res) => {
  const data =  await TktTypeService.deleteTktType(req.params.id);
  if (data instanceof Error) {
    sendErrorResponse({
      res,
      error:data,
      entity: entities.ticket_type,
    });
  } else {
    sendDeletionResponse({
      res,
      data,
      entity: entities.ticket_type,
    });
  }
}
//
export default {
  createTktType,
  updateTktType,
  deleteTktType,
  getTktTypes,
};
