import quickLinkService from "./quickLink.service";
import httpStatus from "http-status";
import QuickLink from "./quickLink.model";
const {
  sendCreateResponse,
  sendDeletionResponse,
  sendErrorResponse,
  sendFetchResponse,
  sendUpdateResponse,
} = require("../../../utils/responseHandler");
import { entities } from "../../../config/constants";
import { uploadSocialIcon } from "../../../utils/fileHandle";

export const createQuickLink: TypeController = async (req, res) => {
  const data =  await quickLinkService.createQuickLink(req.body);
  if (data instanceof Error) {
    sendErrorResponse({
      res,
      error:data,
      entity: entities.quick_link,
    });
  } else {
    sendCreateResponse({
      res,
      data,
      entity: entities.quick_link,
    });
  }
}

//

export const updateQuickLink: TypeController = async (req, res) => {
  const data =  await quickLinkService.updateQuickLink({
    id: req.params.id,
    data: req.body,
  });
  if (data instanceof Error) {
    sendErrorResponse({
      res,
      error:data,
      entity: entities.quick_link,
    });
  } else {
    sendUpdateResponse({
      res,
      data,
      entity: entities.quick_link,
    });
  }
}

//
export const getQuickLinks: TypeController = async (req, res) => {
  const data =  await quickLinkService.getQuickLinks(req.query);
  if (data instanceof Error) {
    sendErrorResponse({
      res,
      error:data,
      entity: entities.quick_link,
    });
  } else {
    sendFetchResponse({
      res,
      data,
      entity: entities.quick_link,
    });
  }
}
//
export const deleteQuickLink: TypeController = async (req, res) => {
  const data =  await quickLinkService.deleteQuickLink(req.params.id);
  if (data instanceof Error) {
    sendErrorResponse({
      res,
      error:data,
      entity: entities.quick_link,
    });
  } else {
    sendDeletionResponse({
      res,
      data,
      entity: entities.quick_link,
    });
  }
}
//
export default {
  createQuickLink,
  updateQuickLink,
  deleteQuickLink,
  getQuickLinks,
};
