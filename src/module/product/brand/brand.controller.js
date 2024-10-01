const brandService = require("./brand.service");
const Brand = require("./brand.model");

const {
  sendCreateResponse,
  sendDeletionResponse,
  sendErrorResponse,
  sendFetchResponse,
  sendUpdateResponse,
} = require("../../../utils/responseHandler");
const { operableEntities } = require("../../../config/constants");
const { isPostBodyValid } = require("./brand.validate");
//

async function createBrand(req, res) {
  try {
    const result = await brandService.createBrand(req.body);
    if (result instanceof Error) {
      sendErrorResponse({ res, error: result, what: operableEntities.brand });
    } else {
      sendCreateResponse({ res, data: result, what: operableEntities.brand });
    }
  } catch (error) {
    console.log("err-1");
    sendErrorResponse({ res, error, what: operableEntities.brand });
  }
}

async function getBrands(req, res) {
  try {
    const result = await brandService.getBrands(req.query);
    if (result instanceof Error) {
      sendErrorResponse({ res, error: result, what: operableEntities.brand });
    } else {
      sendFetchResponse({ res, data: result, what: operableEntities.brand });
    }
  } catch (error) {
    sendErrorResponse({ res, error, what: operableEntities.brand });
  }
}
//
async function updateBrand(req, res) {
  try {
    const result = await brandService.updateBrand({
      id: req.params.id,
      data: req.body,
    });
    if (result instanceof Error) {
      sendErrorResponse({ res, error: result, what: operableEntities.brand });
    } else {
      sendUpdateResponse({ res, data: result, what: operableEntities.brand });
    }
  } catch (error) {
    sendErrorResponse({ res, error, what: operableEntities.brand });
  }
}
//
async function deleteBrand(req, res) {
  try {
    const result = await brandService.deleteBrand(req.params.id);
    if (result instanceof Error) {
      sendErrorResponse({ res, error: result, what: operableEntities.brand });
    } else {
      sendDeletionResponse({
        res,
        data: result,
        what: operableEntities.brand,
      });
    }
  } catch (error) {
    sendErrorResponse({ res, error, what: operableEntities.brand });
  }
}
//
module.exports = {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrands,
};
