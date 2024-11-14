const bannerService = require("./banner.service");
const Banner = require("./banner.model");
const httpStatus = require("http-status");

const fs = require("fs");
const path = require("path");

const {
  sendCreateResponse,
  sendDeletionResponse,
  sendErrorResponse,
  sendFetchResponse,
  sendSingleFetchResponse,
  sendUpdateResponse,
} = require("../../../utils/responseHandler");
const { entities, file_config } = require("../../../config/constants");
const {
  storageMap,
  uploadBannerImage,
  removeFile,
} = require("../../../utils/fileHandle");
const { uploadHandler, fieldsMap } = require("../../../utils/uploader");
const { isPatchBodyValid, isPostBodyValid } = require("./banner.validate");
const config = require("../../../config");
//

async function getSingleBanner(req, res, next) {
  try {
    const data =  await bannerService.getSingleBanner(req.params.id);
    if (data instanceof Error) {
      sendErrorResponse({
        res,
        error:data,
        entity: entities.banner,
      });
    } else {
      sendSingleFetchResponse({
        res,
        data,
        entity: entities.banner,
      });
    }
  } catch (error) {
    sendErrorResponse({ res, error, entity: entities.banner });
  }
}

async function createBanner(req, res, next) {
  try {
    const { title } = req.body;

    if (title === undefined || title === "") {
      return res
        .status(400)
        .json({ success: false, message: "Banner title is missing" });
    }
    //
    let fileUrl;
    let fieldName = fieldsMap[entities.banner][0].name;
    //
    if (!req.files[fieldName]) {
      return res
        .status(400)
        .json({ success: false, message: `Banner thumbnail is missing` });
    }

    fileUrl = await uploadHandler({
      entity: fieldName,
      file: req.files[fieldName][0],
    });

    const addResult = await bannerService.createBanner({
      title,
      thumbnail: fileUrl,
    });
    if (addResult instanceof Error) {
      return sendErrorResponse({
        res,
        error: addResult,
        entity: entities.banner,
      });
    }
    sendCreateResponse({
      res,
      entity: entities.banner,
      data: addResult,
    });
  } catch (error) {
    // await unlinkAsync(req.file.path);
    console.error(`Controller: updateBanner: ${error.message}`);
    sendErrorResponse({ res, error, entity: entities.banner });
  }
}
//
async function updateBanner(req, res) {
  try {
    const bannerId = req.params.id;
    const updatableBanner = await Banner.findById(bannerId);

    // Handle case where banner is not found
    if (!updatableBanner) {
      return res.status(400).json({
        success: false,
        message: "No resource (Banner) with this ID",
      });
    }

    const { title, is_active } = req.body;
    const fieldName = fieldsMap[entities.banner][0].name;

    let fileUrl = updatableBanner.thumbnail;

    // If a new thumbnail is uploaded, handle file upload and remove the old one
    if (req.files?.[fieldName]) {
      fileUrl = await uploadHandler({
        entity: fieldName,
        file: req.files[fieldName][0],
      });
      removeFile({ fileUrl: updatableBanner.thumbnail });
    }

    // Update the banner with new or existing values
    const updatedBanner = await Banner.findByIdAndUpdate(
      bannerId,
      {
        title: title || updatableBanner.title,
        is_active: is_active ?? updatableBanner.is_active,
        thumbnail: fileUrl,
      },
      { new: true }
    );

    sendUpdateResponse({
      res,
      entity: entities.banner,
      data: updatedBanner,
    });
  } catch (error) {
    console.error(`Controller: updateBanner: ${error.message}`);
    sendErrorResponse({
      res,
      error,
      entity: entities.banner,
    });
  }
}
//
async function getBanners(req, res) {
  const data =  await bannerService.getBanners(req.query);
  if (data instanceof Error) {
    sendErrorResponse({ res, error:data, entity: entities.banner });
  } else {
    sendFetchResponse({ res, data, entity: entities.banner });
  }
}
//
async function deleteBanner(req, res) {
  const data =  await bannerService.deleteBanner(req.params.id);
  if (data instanceof Error) {
    sendErrorResponse({ res, error:data, entity: entities.banner });
  } else {
    sendDeletionResponse({ res, data, entity: entities.banner });
  }
}
//
module.exports = {
  createBanner,
  updateBanner,
  deleteBanner,
  getBanners,
  getSingleBanner,
};
