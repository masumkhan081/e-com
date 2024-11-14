const addressService = require("../services/address.service");
const httpStatus = require("http-status");

const {
  sendCreateResponse,
  sendDeletionResponse,
  sendErrorResponse,
  sendFetchResponse,
  sendUpdateResponse,
} = require("../utils/responseHandler");
const { entities } = require("../config/constants");

async function createSaleReturn(req, res) {
  const data =  await addressService.createSaleReturn(req.body);
  if (data instanceof Error) {
    sendErrorResponse({ res, error:data, entity: entities.address });
  } else {
    sendCreateResponse({ res, data, entity: entities.address });
  }
}

async function getAddresses(req, res) {
  const data =  await addressService.getAddresses(req.query);
  if (data instanceof Error) {
    sendErrorResponse({ res, error:data, entity: entities.address });
  } else {
    sendFetchResponse({ res, data, entity: entities.address });
  }
}
//
async function updateAddress(req, res) {
  const data =  await addressService.updateAddress({
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
async function deleteAddress(req, res) {
  const data =  await addressService.deleteAddress(req.params.id);
  if (data instanceof Error) {
    sendErrorResponse({ res, error:data, entity: entities.address });
  } else {
    sendDeletionResponse({ res, data, entity: entities.address });
  }
}
//
module.exports = {
  createSaleReturn,
  updateAddress,
  deleteAddress,
  getAddresses,
};
