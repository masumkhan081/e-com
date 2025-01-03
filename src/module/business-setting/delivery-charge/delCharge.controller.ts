const delChargeService = require("./delCharge.service");
const httpStatus = require("http-status");

const {
  sendCreateResponse,
  sendDeletionResponse,
  sendErrorResponse,
  sendFetchResponse,
  sendUpdateResponse,
} = require("../../../utils/responseHandler");
const { entities } = require("../../../config/constants");
//
async function createDeliveryCharge(req, res) {
  const data =  await delChargeService.createDeliveryCharge(req.body);
  if (data instanceof Error) {
    sendErrorResponse({
      res,
      error:data,
      entity: entities.delivery_charge,
    });
  } else {
    sendCreateResponse({
      res,
      data,
      entity: entities.delivery_charge,
    });
  }
}

async function getDeliveryCharges(req, res) {
  const data =  await delChargeService.getDeliveryCharges(req.query);
  if (data instanceof Error) {
    sendErrorResponse({
      res,
      error:data,
      entity: entities.delivery_charge,
    });
  } else {
    sendFetchResponse({
      res,
      data,
      entity: entities.delivery_charge,
    });
  }
}
//
async function updateDeliveryCharge(req, res) {
  const data =  await delChargeService.updateDeliveryCharge({
    id: req.params.id,
    data: req.body,
  });
  if (data instanceof Error) {
    sendErrorResponse({
      res,
      error:data,
      entity: entities.delivery_charge,
    });
  } else {
    sendUpdateResponse({
      res,
      data,
      entity: entities.delivery_charge,
    });
  }
}
//
async function deleteDeliveryCharge(req, res) {
  const data =  await delChargeService.deleteDeliveryCharge(req.params.id);
  if (data instanceof Error) {
    sendErrorResponse({
      res,
      error:data,
      entity: entities.delivery_charge,
    });
  } else {
    sendDeletionResponse({
      res,
      data,
      entity: entities.delivery_charge,
    });
  }
}
//
module.exports = {
  createDeliveryCharge,
  updateDeliveryCharge,
  deleteDeliveryCharge,
  getDeliveryCharges,
};
