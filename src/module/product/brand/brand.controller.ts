import brandService from "./brand.service";
import Brand from "./brand.model";
import Product from "../product/product.model";
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
import { isPostBodyValid } from "./brand.validate";
import { fieldsMap, uploadHandler } from "../../../utils/uploader";
import { removeFile } from "../../../utils/fileHandle";
//

export const createBrand: TypeController = async (req, res) => {
  let logo;
  try {
    const fieldName = fieldsMap[entities.brand][0].name;
    if (req.files?.[fieldName]) {
      logo = await uploadHandler({
        entity: fieldName,
        file: req.files[fieldName][0],
      });
    }
    const data =  await brandService.createBrand({
      name: req.body.name,
      logo,
    });
    if (data instanceof Error) {
      if (logo) {
        removeFile({ fileUrl: logo });
      }
      sendErrorResponse({ res, error:data, entity: entities.brand });
    } else {
      sendCreateResponse({ res, data, entity: entities.brand });
    }
  } catch (error) {
    sendErrorResponse({ res, error, entity: entities.brand });
  }
}

export const getBrands: TypeController = async (req, res) => {
  try {
    const data =  await brandService.getBrands(req.query);
    if (data instanceof Error) {
      sendErrorResponse({ res, error:data, entity: entities.brand });
    } else {
      sendFetchResponse({ res, data, entity: entities.brand });
    }
  } catch (error) {
    sendErrorResponse({ res, error, entity: entities.brand });
  }
}
export const getSingleBrand: TypeController = async (req, res) => {
  try {
    const data =  await brandService.getSingleBrand(req.params.id);
    if (data instanceof Error) {
      sendErrorResponse({ res, error:data, entity: entities.brand });
    } else {
      sendSingleFetchResponse({
        res,
        data,
        entity: entities.brand,
      });
    }
  } catch (error) {
    sendErrorResponse({ res, error, entity: entities.brand });
  }
}

//
export const updateBrand: TypeController = async (req, res) => {
  let logo;
  try {
    const existingBrand = await Brand.findById(req.params.id);

    if (!existingBrand) {
      return res.status(400).json({
        success: false,
        message: "No brand with this id.",
      });
    }

    const fieldName = fieldsMap[entities.brand][0].name;
    if (req.files?.[fieldName]) {
      logo = await uploadHandler({
        entity: fieldName,
        file: req.files[fieldName][0],
      });
      if (logo) {
        removeFile({ fileUrl: existingBrand.logo });
      }
    }

    const { name, is_active} = req.body;
    console.log("typeof: " + typeof is_active);
    const update = {
      name: name || existingBrand.name,
      is_active: is_active || existingBrand.is_active,
      logo: logo || existingBrand.logo,
    };

    const data =  await brandService.updateBrand({
      id: req.params.id,
      data:update,
    });

    if (data instanceof Error) {
      sendErrorResponse({ res, error:data, entity: entities.brand });
    } else {
      sendUpdateResponse({ res, data, entity: entities.brand });
    }
  } catch (error) {
    if (logo) {
      removeFile({ fileUrl: logo });
    }
    sendErrorResponse({ res, error, entity: entities.brand });
  }
}
//
export const deleteBrand: TypeController = async (req, res) => {
  try {
    const existingBrand = await Brand.findById(req.params.id);

    if (!existingBrand) {
      return res.status(400).json({
        success: false,
        message: "No brand with this id.",
      });
    }

    const isUsed = await Product.countDocuments({
      brand: req.params.id,
    });

    if (isUsed > 0) {
      return sendErrorResponse({
        res,
        error: response_map.alreadyUsed,
        entity: entities.brand,
      });
    }

    const data =  await brandService.deleteBrand(req.params.id);
    if (data instanceof Error) {
      sendErrorResponse({
        res,
        error:data,
        entity: entities.brand,
      });
    } else {
      sendDeletionResponse({
        res,
        data,
        entity: entities.brand,
      });
    }
  } catch (error) {
    sendErrorResponse({ res, error, entity: entities.brand });
  }
}
//
export default {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrands,
  getSingleBrand,
};
