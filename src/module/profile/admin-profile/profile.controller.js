const profileService = require("./profile.service");
const httpStatus = require("http-status");
//
const {
  sendCreateResponse,
  sendDeletionResponse,
  sendErrorResponse,
  sendFetchResponse,
  sendUpdateResponse,
} = require("../../../utils/responseHandler");
const { entities } = require("../../../config/constants");
//
async function createProfile(req, res) {
  const data =  await profileService.createProfile(req.body);
  if (data instanceof Error) {
    sendErrorResponse({ res, error:data, entity: entities.address });
  } else {
    sendCreateResponse({ res, data, entity: entities.address });
  }
}
//
async function getProfiles(req, res) {
  const data =  await profileService.getProfiles(req.query);
  if (data instanceof Error) {
    sendErrorResponse({ res, error:data, entity: entities.address });
  } else {
    sendFetchResponse({ res, data, entity: entities.address });
  }
}
//
async function updateProfile(req, res) {
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
async function deleteProfile(req, res) {
  const data =  await profileService.deleteProfile(req.params.id);
  if (data instanceof Error) {
    sendErrorResponse({ res, error:data, entity: entities.address });
  } else {
    sendDeletionResponse({ res, data, entity: entities.address });
  }
}
//
module.exports = {
  createProfile,
  updateProfile,
  deleteProfile,
  getProfiles,
};
