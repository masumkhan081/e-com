import themeColorService from "./themeColor.service";
import httpStatus from "http-status";

const {
  sendCreateResponse,
  sendDeletionResponse,
  sendErrorResponse,
  sendFetchResponse,
  sendUpdateResponse,
} = require("../../../utils/responseHandler");
import { entities } from "../../../config/constants";

export const createThemeColor: TypeController = async (req, res) => {
  const data = await themeColorService.createThemeColor(req.body);
  if (data instanceof Error) {
    sendErrorResponse({
      res,
      error: data,
      entity: entities.theme_color,
    });
  } else {
    sendCreateResponse({
      res,
      data,
      entity: entities.theme_color,
    });
  }
}

export const getThemeColors: TypeController = async (req, res) => {
  const data = await themeColorService.getThemeColors(req.query);
  if (data instanceof Error) {
    sendErrorResponse({
      res,
      error: data,
      entity: entities.theme_color,
    });
  } else {
    sendFetchResponse({
      res,
      data,
      entity: entities.theme_color,
    });
  }
}
//
export const updateThemeColor: TypeController = async (req, res) => {
  const data = await themeColorService.updateThemeColor({
    id: req.params.id,
    data: req.body,
  });
  if (data instanceof Error) {
    sendErrorResponse({
      res,
      error: data,
      entity: entities.theme_color,
    });
  } else {
    sendUpdateResponse({
      res,
      data,
      entity: entities.theme_color,
    });
  }
}
//
export const deleteThemeColor: TypeController = async (req, res) => {
  try {
    const data = await themeColorService.deleteThemeColor(req.params.id);
    if (data instanceof Error) {
      sendErrorResponse({
        res,
        error: data,
        entity: entities.theme_color,
      });
    } else {
      sendDeletionResponse({
        res,
        data,
        entity: entities.theme_color,
      });
    }
  } catch (error) {
    console.log(first);
  }
}
//
export default {
  createThemeColor,
  updateThemeColor,
  deleteThemeColor,
  getThemeColors,
};
