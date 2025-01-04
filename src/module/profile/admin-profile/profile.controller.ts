import profileService from "./profile.service";
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
export const createProfile: TypeController = async (req, res) => {
  const data =  await profileService.createProfile(req.body);
  if (data instanceof Error) {
    sendErrorResponse({ res, error:data, entity: entities.address });
  } else {
    sendCreateResponse({ res, data, entity: entities.address });
  }
}
//
export const getProfiles: TypeController = async (req, res) => {
  const data =  await profileService.getProfiles(req.query);
  if (data instanceof Error) {
    sendErrorResponse({ res, error:data, entity: entities.address });
  } else {
    sendFetchResponse({ res, data, entity: entities.address });
  }
}
//
export const updateProfile: TypeController = async (req, res) => {
  const data =  await profileService.updateProfile({
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
export const deleteProfile: TypeController = async (req, res) => {
  const data =  await profileService.deleteProfile(req.params.id);
  if (data instanceof Error) {
    sendErrorResponse({ res, error:data, entity: entities.address });
  } else {
    sendDeletionResponse({ res, data, entity: entities.address });
  }
}
//
export default {
  createProfile,
  updateProfile,
  deleteProfile,
  getProfiles,
};
