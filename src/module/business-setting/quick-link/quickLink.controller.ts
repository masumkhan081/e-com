const quickLinkService = require("./quickLink.service");
const httpStatus = require("http-status");
const QuickLink = require("./quickLink.model");
const {
  sendCreateResponse,
  sendDeletionResponse,
  sendErrorResponse,
  sendFetchResponse,
  sendUpdateResponse,
} = require("../../../utils/responseHandler");
const { entities } = require("../../../config/constants");
const { uploadSocialIcon } = require("../../../utils/fileHandle");

async function createQuickLink(req, res) {
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

async function updateQuickLink(req, res) {
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
async function getQuickLinks(req, res) {
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
async function deleteQuickLink(req, res) {
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
module.exports = {
  createQuickLink,
  updateQuickLink,
  deleteQuickLink,
  getQuickLinks,
};
