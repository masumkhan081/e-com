const sizeService = require("./size.service");
const Size = require("./size.model");

const {
  sendCreateResponse,
  sendDeletionResponse,
  sendErrorResponse,
  sendFetchResponse,
  sendUpdateResponse,
  response_map,
} = require("../../../utils/responseHandler");
const { entities } = require("../../../config/constants");
const { isPostBodyValid } = require("./size.validate");
const Product = require("../product/product.model");

async function createSize(req, res) {
  try {
    const data =  await sizeService.createSize(req.body);
    if (data instanceof Error) {
      sendErrorResponse({ res, error:data, entity: entities.size });
    } else {
      sendCreateResponse({ res, data, entity: entities.size });
    }
  } catch (error) {
    sendErrorResponse({ res, error, entity: entities.size });
  }
}
//
async function updateSizeStatus(req, res) {
  try {
    const exist = await Size.findById(req.params.id);
    if (exist) {
      const data =  await sizeService.updateSizeStatus({
        id: req.params.id,
        is_active: req.body.is_active,
      });
      if (data instanceof Error) {
        sendErrorResponse({ res, error:data, entity: entities.size });
      } else {
        sendUpdateResponse({ res, data, entity: entities.size });
      }
    } else {
      sendErrorResponse({
        res,
        error: response_map.id_not_found,
        entity: entities.size,
      });
    }
  } catch (error) {
    sendErrorResponse({ res, error, entity: entities.size });
  }
}

async function getSizes(req, res) {
  try {
    const data =  await sizeService.getSizes(req.query);
    if (data instanceof Error) {
      sendErrorResponse({ res, error:data, entity: entities.size });
    } else {
      sendFetchResponse({ res, data, entity: entities.size });
    }
  } catch (error) {
    sendErrorResponse({ res, error, entity: entities.size });
  }
}
//
async function updateSize(req, res) {
  try {
    const exist = await Size.findById(req.params.id);
    if (exist) {
      const data =  await sizeService.updateSize({
        id: req.params.id,
        data: req.body,
      });
      if (data instanceof Error) {
        sendErrorResponse({ res, error:data, entity: entities.size });
      } else {
        sendUpdateResponse({ res, data, entity: entities.size });
      }
    } else {
      sendErrorResponse({
        res,
        error: response_map.id_not_found,
        entity: entities.size,
      });
    }
  } catch (error) {
    sendErrorResponse({ res, error, entity: entities.size });
  }
}
//
async function getSingleSize(req, res) {
  try {
    const data =  await sizeService.getSingleSize(req.params.id);
    if (data instanceof Error) {
      sendErrorResponse({ res, error:data, entity: entities.size });
    } else {
      sendFetchResponse({ res, data, entity: entities.size });
    }
  } catch (error) {
    sendErrorResponse({ res, error, entity: entities.size });
  }
}
//
async function deleteSize(req, res) {
  try {
    const exist = await Size.findById(req.params.id);
    console.log(exist);
    if (exist) {
      const isUsed = await Product.countDocuments({
        size: req.params.id,
      });
      console.log("isUsed: " + isUsed);

      if (isUsed === 0) {
        const data =  await sizeService.deleteSize(req.params.id);
        if (data instanceof Error) {
          sendErrorResponse({
            res,
            error:data,
            entity: entities.size,
          });
        } else {
          sendDeletionResponse({
            res,
            data,
            entity: entities.size,
          });
        }
      } else {
        sendErrorResponse({
          res,
          error: response_map.already_used,
          entity: entities.size,
        });
      }
    } else {
      sendErrorResponse({
        res,
        error: response_map.id_not_found,
        entity: entities.size,
      });
    }
  } catch (error) {
    sendErrorResponse({ res, error, entity: entities.size });
  }
}
//
module.exports = {
  createSize,
  updateSize,
  deleteSize,
  getSizes,
  getSingleSize,
  updateSizeStatus,
};
