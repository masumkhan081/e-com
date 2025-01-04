import categoryService from "./category.service";
import httpStatus from "http-status";
import { promisify } from "util";
import fs from "fs";
import path from "path";
const unlinkAsync = promisify(fs.unlink);
import Category from "./category.model";
const {
  sendCreateResponse,
  sendDeletionResponse,
  sendErrorResponse,
  sendFetchResponse,
  sendUpdateResponse,
  sendSingleFetchResponse,
} = require("../../../utils/responseHandler");
import { entities } from "../../../config/constants";
import { removeFile } from "../../../utils/fileHandle";
import { isPostBodyValid } from "./category.validate";
import { uploadHandler, fieldsMap } from "../../../utils/uploader";
import Product from "../product/product.model";

export const getSingleCategory: TypeController = async (req, res) => {
  try {
    const data = await categoryService.getSingleCategory(req.params.id);
    if (data instanceof Error) {
      sendErrorResponse({
        res,
        error: data,
        entity: entities.category,
      });
    } else {
      sendSingleFetchResponse({
        res,
        data,
        entity: entities.category,
      });
    }
  } catch (error) {
    sendErrorResponse({ res, error, entity: entities.category });
  }
}

export const createProductCategory: TypeController = async (req, res) => {
  try {
    let fileUrl;
    const { name, description } = req.body;

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(409).json({
        success: false,
        message: "Already exist",
      });
    }

    const fieldName = fieldsMap[entities.category][0].name;
    if (req.files?.[fieldName]) {
      fileUrl = await uploadHandler({
        entity: fieldName,
        file: req.files[fieldName][0],
      });
    }
    //
    const addResult = await Category.create({
      name,
      thumbnail: fileUrl,
      description,
    });
    sendCreateResponse({
      res,
      entity: entities.category,
      data: addResult,
    });
  } catch (error) {
    sendErrorResponse({ res, error, entity: entities.category });
  }
}
//
export const updateCategory: TypeController = async (req, res) => {
  try {
    const { name, description, is_active } = req.body;
    const updatableCategoryId = req.params.id;
    let fileUrl;

    const updatableCategory = await Category.findById(updatableCategoryId);

    if (!updatableCategory) {
      return res.status(404).json({
        success: false,
        message: "No category found with this id.",
      });
    }

    const fieldName = fieldsMap[entities.category][0].name;

    if (req?.files?.[fieldName]) {
      fileUrl = await uploadHandler({
        entity: fieldName,
        file: req.files[fieldName][0],
      });
      removeFile({ fileUrl: updatableCategory.thumbnail });
    }

    const editResult = await Category.findByIdAndUpdate(
      updatableCategoryId,
      {
        name: name || updatableCategory.name,
        is_active:
          is_active !== undefined ? is_active : updatableCategory.is_active,
        description: description || updatableCategory.description,
        thumbnail: fileUrl || updatableCategory.thumbnail,
      },
      { new: true }
    );

    sendUpdateResponse({
      res,
      entity: entities.category,
      data: editResult,
    });
  } catch (error) {
    sendErrorResponse({ res, error, entity: entities.category });
  }
}
//
export const getCategories: TypeController = async (req, res) => {
  const data = await categoryService.getCategories(req.query);
  if (data instanceof Error) {
    sendErrorResponse({ res, error: data, entity: entities.category });
  } else {
    sendFetchResponse({ res, data, entity: entities.category });
  }
}
//
export const deleteCategory: TypeController = async (req, res) => {
  try {
    const deletableId = req.params.id;
    const isUsed = Product.findOne({ category: deletableId });

    if (isUsed > 0) {
      return res.status(400).json({
        success: false,
        message: "Category can't be deleted as used in products",
      });
    }

    const data = await categoryService.deleteCategory(req.params.id);
    if (data instanceof Error) {
      sendErrorResponse({
        res,
        error: data,
        entity: entities.category,
      });
    } else {
      sendDeletionResponse({
        res,
        data,
        entity: entities.category,
      });
    }
  } catch (error) {
    console.log("err: contrl: delete " + error.message);
    sendErrorResponse({
      res,
      error: data,
      entity: entities.category,
    });
  }
}
//
export default {
  createProductCategory,
  deleteCategory,
  getCategories,
  getSingleCategory,
  updateCategory,
};
