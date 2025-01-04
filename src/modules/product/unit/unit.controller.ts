import unitService from "./unit.service";
import Unit from "./unit.model";
const {
  sendCreateResponse,
  sendDeletionResponse,
  sendErrorResponse,
  sendFetchResponse,
  sendUpdateResponse,
  response_map,
  sendSingleFetchResponse,
} = require("../../../utils/responseHandler");
import { entities } from "../../../config/constants";
import Product from "../product/product.model";
//

export const getSingleUnit: TypeController = async (req, res) => {
  try {
    const data =  await unitService.getSingleUnit(req.params.id);
    if (data instanceof Error) {
      sendErrorResponse({ res, error:data, entity: entities.unit });
    } else {
      sendSingleFetchResponse({
        res,
        data,
        entity: entities.unit,
      });
    }
  } catch (error) {
    sendErrorResponse({ res, error, entity: entities.unit });
  }
}
//
export const createUnit: TypeController = async (req, res) => {
  try {
    const data =  await unitService.createUnit(req.body);
    if (data instanceof Error) {
      sendErrorResponse({ res, error:data, entity: entities.unit });
    } else {
      sendCreateResponse({ res, data, entity: entities.unit });
    }
  } catch (error) {
    sendErrorResponse({ res, error, entity: entities.unit });
  }
}

export const getUnits: TypeController = async (req, res) => {
  try {
    const data =  await unitService.getUnits(req.query);
    if (data instanceof Error) {
      sendErrorResponse({ res, error:data, entity: entities.unit });
    } else {
      sendFetchResponse({ res, data, entity: entities.unit });
    }
  } catch (error) {
    sendErrorResponse({ res, error, entity: entities.unit });
  }
}
//
export const updateUnit: TypeController = async (req, res) => {
  try {
    const data =  await unitService.updateUnit({
      id: req.params.id,
      data: req.body,
    });
    if (data instanceof Error) {
      sendErrorResponse({ res, error:data, entity: entities.unit });
    } else {
      sendUpdateResponse({ res, data, entity: entities.unit });
    }
  } catch (error) {
    sendErrorResponse({ res, error, entity: entities.unit });
  }
}
//
export const deleteUnit: TypeController = async (req, res) => {
  try {
    const exist = await Unit.findById(req.params.id);

    if (exist) {
      const isUsed = await Product.countDocuments({
        unit: req.params.id,
      });
      console.log("isUsed: " + isUsed);

      if (isUsed === 0) {
        const data =  await unitService.deleteUnit(req.params.id);
        if (data instanceof Error) {
          sendErrorResponse({
            res,
            error:data,
            entity: entities.unit,
          });
        } else {
          sendDeletionResponse({
            res,
            data,
            entity: entities.unit,
          });
        }
      } else {
        sendErrorResponse({
          res,
          error: response_map.already_used,
          entity: entities.unit,
        });
      }
    } else {
      sendErrorResponse({
        res,
        error: response_map.id_not_found,
        entity: entities.unit,
      });
    }
  } catch (error) {
    sendErrorResponse({ res, error, entity: entities.unit });
  }
}
//
export const updateUnitStatus: TypeController = async (req, res) => {
  try {
    const exist = await Unit.findById(req.params.id);
    if (exist) {
      const data =  await unitService.updateUnitStatus({
        id: req.params.id,
        is_active: req.body.is_active,
      });
      if (data instanceof Error) {
        sendErrorResponse({ res, error:data, entity: entities.unit });
      } else {
        sendUpdateResponse({ res, data, entity: entities.unit });
      }
    } else {
      sendErrorResponse({
        res,
        error: response_map.id_not_found,
        entity: entities.unit,
      });
    }
  } catch (error) {
    sendErrorResponse({ res, error, entity: entities.size });
  }
}
//
export default {
  createUnit,
  updateUnit,
  deleteUnit,
  getUnits,
  getSingleUnit,
  updateUnitStatus,
};
