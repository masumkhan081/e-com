const sizeService = require("./size.service");
const Size = require("./size.model");

const {
  sendCreateResponse,
  sendDeletionResponse,
  sendErrorResponse,
  sendFetchResponse,
  sendUpdateResponse,
} = require("../../../utils/responseHandler");
const { operableEntities } = require("../../../config/constants");
const { isPostBodyValid } = require("./size.validate");

async function createSize(req, res) {
  try {
    const valid = isPostBodyValid(req.body);
    if (valid.success) {
      const result = await sizeService.createSize(req.body);
      if (result instanceof Error) {
        sendErrorResponse({ res, error: result, what: operableEntities.size });
      } else {
        sendCreateResponse({ res, data: result, what: operableEntities.size });
      }
    } else {
      res.status(400).send({ message: valid.message });
    }
  } catch (error) {
    sendErrorResponse({ res, error, what: operableEntities.size });
  }
}

async function getSizes(req, res) {
  try {
    const result = await sizeService.getSizes(req.query);
    if (result instanceof Error) {
      sendErrorResponse({ res, error: result, what: operableEntities.size });
    } else {
      sendFetchResponse({ res, data: result, what: operableEntities.size });
    }
  } catch (error) {
    sendErrorResponse({ res, error, what: operableEntities.size });
  }
}
//
async function updateSize(req, res) {
  try {
    const result = await sizeService.updateSize({
      id: req.params.id,
      data: req.body,
    });
    if (result instanceof Error) {
      sendErrorResponse({ res, error: result, what: operableEntities.size });
    } else {
      sendUpdateResponse({ res, data: result, what: operableEntities.size });
    }
  } catch (error) {
    sendErrorResponse({ res, error, what: operableEntities.size });
  }
}
//
async function deleteSize(req, res) {
  try {
    const result = await sizeService.deleteSize(req.params.id);
    if (result instanceof Error) {
      sendErrorResponse({ res, error: result, what: operableEntities.size });
    } else {
      sendDeletionResponse({
        res,
        data: result,
        what: operableEntities.size,
      });
    }
  } catch (error) {
    sendErrorResponse({ res, error, what: operableEntities.size });
  }
}
//
module.exports = {
  createSize,
  updateSize,
  deleteSize,
  getSizes,
};
