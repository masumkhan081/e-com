const unitService = require("./unit.service");
const Unit = require("./unit.model");

const {
  sendCreateResponse,
  sendDeletionResponse,
  sendErrorResponse,
  sendFetchResponse,
  sendUpdateResponse,
} = require("../../../utils/responseHandler");
const { operableEntities } = require("../../../config/constants");
const { isPostBodyValid } = require("./unit.validate");

async function createUnit(req, res) {
  try {
    const valid = isPostBodyValid(req.body);
    if (valid.success) {
      const result = await unitService.createUnit(req.body);
      if (result instanceof Error) {
        sendErrorResponse({ res, error: result, what: operableEntities.unit });
      } else {
        sendCreateResponse({ res, data: result, what: operableEntities.unit });
      }
    } else {
      res.status(400).send({ message: valid.message });
    }
  } catch (error) {
    sendErrorResponse({ res, error, what: operableEntities.unit });
  }
}

async function getUnits(req, res) {
  try {
    const result = await unitService.getUnits(req.query);
    if (result instanceof Error) {
      sendErrorResponse({ res, error: result, what: operableEntities.unit });
    } else {
      sendFetchResponse({ res, data: result, what: operableEntities.unit });
    }
  } catch (error) {
    sendErrorResponse({ res, error, what: operableEntities.unit });
  }
}
//
async function updateUnit(req, res) {
  try {
    const result = await unitService.updateUnit({
      id: req.params.id,
      data: req.body,
    });
    if (result instanceof Error) {
      sendErrorResponse({ res, error: result, what: operableEntities.unit });
    } else {
      sendUpdateResponse({ res, data: result, what: operableEntities.unit });
    }
  } catch (error) {
    sendErrorResponse({ res, error, what: operableEntities.unit });
  }
}
//
async function deleteUnit(req, res) {
  try {
    const result = await unitService.deleteUnit(req.params.id);
    if (result instanceof Error) {
      sendErrorResponse({ res, error: result, what: operableEntities.unit });
    } else {
      sendDeletionResponse({
        res,
        data: result,
        what: operableEntities.unit,
      });
    }
  } catch (error) {
    sendErrorResponse({ res, error, what: operableEntities.unit });
  }
}
//
module.exports = {
  createUnit,
  updateUnit,
  deleteUnit,
  getUnits,
};
