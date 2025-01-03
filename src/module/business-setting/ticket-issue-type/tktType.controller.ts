const TktTypeService = require("./tktType.service");
const httpStatus = require("http-status");

const {
  sendCreateResponse,
  sendDeletionResponse,
  sendErrorResponse,
  sendFetchResponse,
  sendUpdateResponse,
} = require("../../../utils/responseHandler");
const { entities } = require("../../../config/constants");

async function createTktType(req, res) {
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

async function getTktTypes(req, res) {
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
async function updateTktType(req, res) {
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
async function deleteTktType(req, res) {
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
module.exports = {
  createTktType,
  updateTktType,
  deleteTktType,
  getTktTypes,
};
