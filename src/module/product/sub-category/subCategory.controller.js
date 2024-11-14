const subCategoryService = require("./subCategory.service");
const httpStatus = require("http-status");
const SubCategory = require("./subCategory.model");
const {
  sendCreateResponse,
  sendDeletionResponse,
  sendErrorResponse,
  sendFetchResponse,
  sendUpdateResponse,
  sendSingleFetchResponse,
} = require("../../../utils/responseHandler");
const { entities } = require("../../../config/constants");
const { removeFile } = require("../../../utils/fileHandle");
const { isPostBodyValid } = require("./subCategory.validate");
const { uploadHandler, fieldsMap } = require("../../../utils/uploader");
const Category = require("../category/category.model");
//

async function getSingleSubCategory(req, res) {
  try {
    const data = await subCategoryService.getSingleSubCategory(req.params.id);
    if (data instanceof Error) {
      sendErrorResponse({
        res,
        error: data,
        entity: entities.sub_category,
      });
    } else {
      sendSingleFetchResponse({
        res,
        data,
        entity: entities.sub_category,
      });
    }
  } catch (error) {
    sendErrorResponse({ res, error, entity: entities.sub_category });
  }
}

async function createSubCategory(req, res) {
  let fileUrl;
  try {
    //
    let fieldName = fieldsMap[entities.sub_category][0].name;
    if (req?.files?.[fieldName]) {
      fileUrl = await uploadHandler({
        entity: fieldName,
        file: req.files[fieldName][0],
      });
    }

    const { name, category, description } = req.body;

    const addResult = await SubCategory.create({
      name,
      category,
      thumbnail: fileUrl,
      description,
    });

    // const categoryUpdate = await SubCategory.findByIdAndUpdate(
    //   addResult.id,
    //   { $push: { category: { $each: valid.categories } } },
    //   { new: true }
    // );
    // console.log("categoryUpdate:: "+JSON.stringify(categoryUpdate));

    // const updatedUser = await User.findByIdAndUpdate(
    //   userId,
    //   { $push: { hobbies: { $each: newHobbies } } }, // Push multiple hobbies
    //   { new: true }
    // );

    sendCreateResponse({
      res,
      entity: entities.sub_category,
      data: addResult,
    });
  } catch (error) {
    console.log("controller: create : " + error.message);
    sendErrorResponse({ res, error, entity: entities.sub_category });
  }
}
//
async function updateSubCategory(req, res) {
  let fileUrl;
  try {
    const { name, category, description, is_active } = req.body;
    const updatableSubCategoryId = req.params.id;

    const existingSubCategory = await SubCategory.findById(
      updatableSubCategoryId
    );

    if (!existingSubCategory) {
      return res.status(404).json({
        success: false,
        message: "Target subcateogry doesn't exist",
      });
    }

    if (category) {
      const existingCategory = await Category.findById(category);
      if (!existingCategory) {
        return res.status(404).json({
          success: false,
          message: "Category doesn't exist",
        });
      }
    }

    let fieldName = fieldsMap[entities.sub_category][0].name;

    if (req?.files?.[fieldName]) {
      fileUrl = await uploadHandler({
        entity: fieldName,
        file: req.files[fieldName][0],
      });
      removeFile({ fileUrl: existingSubCategory.thumbnail });
    }

    const editResult = await SubCategory.findByIdAndUpdate(
      updatableSubCategoryId,
      {
        name: name || existingSubCategory.name,
        is_active: is_active || existingSubCategory.is_active,
        description: description || existingSubCategory.description,
        thumbnail: fileUrl || existingSubCategory.thumbnail,
        category: category || existingSubCategory.category,
      },
      { new: true }
    );
    sendUpdateResponse({
      res,
      entity: entities.sub_category,
      data: editResult,
    });
  } catch (error) {
    console.log("err: " + error.message);
    removeFile({ fileUrl });
    sendErrorResponse({ res, error, entity: entities.sub_category });
  }
}

async function getSubCategories(req, res) {
  const data = await subCategoryService.getSubCategories(req.query);
  if (data instanceof Error) {
    sendErrorResponse({
      res,
      error: data,
      entity: entities.sub_category,
    });
  } else {
    sendFetchResponse({
      res,
      data,
      entity: entities.sub_category,
    });
  }
}

//
async function deleteSubCategory(req, res) {
  const data = await subCategoryService.deleteSubCategory(req.params.id);
  if (data instanceof Error) {
    sendErrorResponse({
      res,
      error: data,
      entity: entities.sub_category,
    });
  } else {
    sendDeletionResponse({
      res,
      data,
      entity: entities.sub_category,
    });
  }
}
//
module.exports = {
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getSubCategories,
  getSingleSubCategory,
};
