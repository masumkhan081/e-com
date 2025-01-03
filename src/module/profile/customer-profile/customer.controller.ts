const customerService = require("./customer.service");
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
async function createCustomer(req, res) {
  const data =  await customerService.createCustomer(req.body);
  if (data instanceof Error) {
    sendErrorResponse({ res, error:data, entity: entities.customer });
  } else {
    sendCreateResponse({ res, data, entity: entities.customer });
  }
}

async function getCustomers(req, res) {
  const data =  await customerService.getCustomers(req.query);
  if (data instanceof Error) {
    sendErrorResponse({ res, error:data, entity: entities.customer });
  } else {
    sendFetchResponse({ res, data, entity: entities.customer });
  }
}
//
async function updateCustomer(req, res) {
  const data =  await customerService.updateCustomer({
    id: req.params.id,
    data: req.body,
  });
  if (data instanceof Error) {
    sendErrorResponse({ res, error:data, entity: entities.customer });
  } else {
    sendUpdateResponse({ res, data, entity: entities.customer });
  }
}
//
async function deleteCustomer(req, res) {
  const data =  await customerService.deleteAddress(req.params.id);
  if (data instanceof Error) {
    sendErrorResponse({ res, error:data, entity: entities.customer });
  } else {
    sendDeletionResponse({
      res,
      data,
      entity: entities.customer,
    });
  }
}
//
module.exports = {
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomers,
};
