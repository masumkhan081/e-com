import adService from "./ad.service";
//
const {
  sendCreateResponse,
  sendDeletionResponse,
  sendErrorResponse,
  sendFetchResponse,
  sendSingleFetchResponse,
  sendUpdateResponse,
} = require("../../../utils/responseHandler");
//
import httpStatus from "http-status";
import { promisify } from "util";
import fs from "fs";
import path from "path";
const unlinkAsync = promisify(fs.unlink);
import { entities } from "../../../config/constants";
import Ad from "./ad.model";
import { fieldsMap, uploadHandler } from "../../../utils/uploader";
import { removeFile } from "../../../utils/fileHandle";

//
async function getSingleAd(req, res, next) {
  try {
    const data = await adService.getSingleAd(req.params.id);
    if (data instanceof Error) {
      sendErrorResponse({
        res,
        error: data,
        entity: entities.ad,
      });
    } else {
      sendSingleFetchResponse({ res, data, entity: entities.ad });
    }
  } catch (error) {
    sendErrorResponse({ res, error, entity: entities.ad });
  }
}

async function createAd(req, res, next) {
  let fileUrl;
  try {
    // Ensure the uploaded file is available
    const fieldName = fieldsMap[entities.ad][0].name;
    if (req.files && req.files[fieldName] && req.files[fieldName][0]) {
      fileUrl = await uploadHandler({
        entity: fieldName,
        file: req.files[fieldName][0],
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Ad thumbnail file is required." });
    }
    req.body.thumbnail = fileUrl;

    const addResult = await Ad.create(req.body);
    sendCreateResponse({
      res,
      entity: entities.ad,
      data: addResult,
    });
  } catch (error) {
    if (fileUrl) {
      await unlinkAsync(fileUrl); // Unlink the file if fileUrl is valid
    }
    sendErrorResponse({ res, error, entity: entities.banner });
  }
}
//
export const updateAd: TypeController = async (req, res) => {
  try {
    const { title, display_page, is_active } = req.body;
    const idUpdatableAd = req.params.id;

    // Attempt to find the ad to update
    const updatableAd = await Ad.findById(idUpdatableAd);
    if (!updatableAd) {
      return res.status(404).json({
        success: false,
        message: "Ad not found.",
      });
    }

    let fileUrl;

    // Check for new thumbnail file and upload
    if (req.files && req.files["ad_thumbnail"]) {
      const fieldName = fieldsMap[entities.ad][0].name;
      fileUrl = await uploadHandler({
        entity: fieldName,
        file: req.files[fieldName][0],
      });

      // Remove old thumbnail file if exists
      if (updatableAd.thumbnail) {
        await removeFile({ fileUrl: updatableAd.thumbnail });
      }
    }

    // Update the ad with new data
    const editResult = await Ad.findByIdAndUpdate(
      idUpdatableAd,
      {
        title: title || updatableAd.title,
        is_active: is_active !== undefined ? is_active : updatableAd.is_active,
        display_page: display_page || updatableAd.display_page,
        thumbnail: fileUrl || updatableAd.thumbnail,
      },
      { new: true }
    );

    // Send successful update response
    sendUpdateResponse({
      res,
      entity: entities.ad,
      data: editResult,
    });
  } catch (error) {
    console.error("Update Ad Error:", error);
    sendErrorResponse({ res, error, entity: entities.ad });
  }
}

export const getAds: TypeController = async (req, res) => {
  const data = await adService.getAds(req.query);
  if (data instanceof Error) {
    sendErrorResponse({ res, error: data, entity: entities.ad });
  } else {
    sendFetchResponse({ res, data, entity: entities.ad });
  }
}

//
export const deleteAd: TypeController = async (req, res) => {
  const data = await adService.deleteAd(req.params.id);
  if (data instanceof Error) {
    console.log("delete ad ----");
    sendErrorResponse({ res, error: data, entity: entities.ad });
  } else {
    sendDeletionResponse({ res, data, entity: entities.ad });
  }
}
//
export default {
  createAd,
  updateAd,
  deleteAd,
  getAds,
  getSingleAd,
};
