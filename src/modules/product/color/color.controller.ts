import colorService from "./color.service";
import httpStatus from "http-status";

const {
  sendCreateResponse,
  sendDeletionResponse,
  sendErrorResponse,
  sendFetchResponse,
  sendUpdateResponse,
} = require("../../../utils/responseHandler");
import { entities } from "../../../config/constants";

export const getSingleColor: TypeController = async (req, res) => {
  try {
    const data =  await colorService.getSingleColor(req.params.id);
    if (data instanceof Error) {
      sendErrorResponse({ res, error:data, entity: entities.color });
    } else {
      sendFetchResponse({ res, data, entity: entities.color });
    }
  } catch (error) {
    sendErrorResponse({ res, error, entity: entities.color });
  }
}
//
export const updateColorStatus: TypeController = async (req, res) => {
  try {
    const exist = await Color.findById(req.params.id);
    if (exist) {
      const data =  await colorService.updateColorStatus({
        id: req.params.id,
        is_active: req.body.is_active,
      });
      if (data instanceof Error) {
        sendErrorResponse({ res, error:data, entity: entities.color });
      } else {
        sendUpdateResponse({ res, data, entity: entities.color });
      }
    } else {
      sendErrorResponse({
        res,
        error: response_map.id_not_found,
        entity: entities.color,
      });
    }
  } catch (error) {
    sendErrorResponse({ res, error, entity: entities.color });
  }
}

export const createColor: TypeController = async (req, res) => {
  try {
    const data =  await colorService.createColor(req.body);
    if (data instanceof Error) {
      sendErrorResponse({ res, error:data, entity: entities.color });
    } else {
      sendCreateResponse({ res, data, entity: entities.color });
    }
  } catch (error) {
    console.log("error: createColor: " + error.message);
    sendErrorResponse({ res, error, entity: entities.color });
  }
}

export const getColors: TypeController = async (req, res) => {
  try {
    const data =  await colorService.getColors(req.query);
    if (data instanceof Error) {
      sendErrorResponse({ res, error:data, entity: entities.color });
    } else {
      sendFetchResponse({ res, data, entity: entities.color });
    }
  } catch (error) {
    sendErrorResponse({ res, error, entity: entities.color });
  }
}
//
export const updateColor: TypeController = async (req, res) => {
  try {
    const data =  await colorService.updateColor({
      id: req.params.id,
      data: req.body,
    });
    if (data instanceof Error) {
      sendErrorResponse({ res, error:data, entity: entities.color });
    } else {
      sendUpdateResponse({ res, data, entity: entities.color });
    }
  } catch (error) {
    sendErrorResponse({ res, error, entity: entities.color });
  }
}
//
export const deleteColor: TypeController = async (req, res) => {
  try {
    const data =  await colorService.deleteColor(req.params.id);
    if (data instanceof Error) {
      sendErrorResponse({ res, error:data, entity: entities.color });
    } else {
      sendDeletionResponse({ res, data, entity: entities.color });
    }
  } catch (error) {
    sendErrorResponse({ res, error, entity: entities.color });
  }
}
//
export default {
  createColor,
  updateColor,
  deleteColor,
  getColors,
  getSingleColor,
  updateColorStatus,
};
