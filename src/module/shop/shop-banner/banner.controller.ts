import shopBannerService from "./banner.service";
import ShopBanner from "./banner.model";
import httpStatus from "http-status";
//
import { promisify } from "util";
import fs from "fs";
import path from "path";
const unlinkAsync = promisify(fs.unlink);
//
const {
  sendCreateResponse,
  sendDeletionResponse,
  sendErrorResponse,
  sendFetchResponse,
  sendUpdateResponse,
} = require("../../../utils/responseHandler");
import { entities } from "../../../config/constants";
import { fieldsMap, uploadHandler } from "../../../utils/uploader";
import { isPostBodyValid } from "./banner.validate";

async function createBanner(req, res, next) {
  try {
    const valid = isPostBodyValid({ files: req.files, bodyData: req.body });
    let fileUrl;
    //
    console.log("v: " + JSON.stringify(valid));

    if (valid.success) {
      const fieldName = fieldsMap[entities.shop_banner][0].name;
      fileUrl = await uploadHandler({
        entity: fieldName,
        file: req.files[fieldName][0],
      });

      console.log("fieldName: " + fieldName);

      try {
        const addResult = await ShopBanner.create({
          title: valid.title,
          is_active: valid.is_active,
          thumbnail: fileUrl,
        });
        sendCreateResponse({
          res,
          entity: entities.shop_banner,
          data: addResult,
        });
      } catch (error) {
        // await unlinkAsync(req.file.path);
        sendErrorResponse({ res, error, entity: entities.shop_banner });
      }
    } else {
      res.status(400).send({ message: valid.message });
    }
  } catch (error) {
    // await unlinkAsync(req.file.path);
    sendErrorResponse({ res, error, entity: entities.shop_banner });
  }
}

//
export const updateBanner: TypeController = async (req, res) => {
  try {
    const { title, is_active } = req.body;
    const idUpdatableId = req.params.id;
    let fileUrl;
    //
    try {
      const updatableShopBanner = await ShopBanner.findById(idUpdatableId);
      if (updatableShopBanner) {
        if (req.files["shop_banner"]) {
          const fieldName = fieldsMap[entities.shop_banner][0].name;
          fileUrl = await uploadHandler({
            entity: fieldName,
            file: req.files[fieldName][0],
          });
          console.log("fileUrl:   " + fileUrl);
          const deleteUrl = path.join(
            __dirname,
            `../../../../${updatableShopBanner.thumbnail}`
          );
          console.log("deleteUrl:   " + deleteUrl);
          await unlinkAsync(deleteUrl);
          console.log("deleteUrl:   " + deleteUrl);
        }
        const editResult = await ShopBanner.findByIdAndUpdate(
          idUpdatableId,
          {
            title: title ? title : updatableShopBanner.title,
            is_active: is_active ? is_active : updatableShopBanner.is_active,
            thumbnail: fileUrl ? fileUrl : updatableShopBanner.thumbnail,
          },
          { new: true }
        );
        sendUpdateResponse({
          res,
          entity: entities.shop_banner,
          data: editResult,
        });
      } else {
        if (fileUrl) {
          await unlinkAsync(fileUrl);
        }
        res.status(404).send({
          success: false,
          status: 404,
          message: "Id not found",
        });
      }
    } catch (error) {
      console.log("error cash ... ");
      if (req.file.path) {
        await unlinkAsync(req.file.path);
      }
      sendErrorResponse({ res, error, entity: entities.banner });
    }
  } catch (error) {
    console.log("error cash ... 2");
    sendErrorResponse({ res, error, entity: entities.banner });
  }
}

export const getBanners: TypeController = async (req, res) => {
  const data =  await shopBannerService.getBanners(req.query);
  if (data instanceof Error) {
    sendErrorResponse({
      res,
      error:data,
      entity: entities.shop_banner,
    });
  } else {
    sendFetchResponse({
      res,
      data,
      entity: entities.shop_banner,
    });
  }
}
//
export const deleteBanner: TypeController = async (req, res) => {
  const data =  await shopBannerService.deleteBanner(req.params.id);
  if (data instanceof Error) {
    sendErrorResponse({
      res,
      error:data,
      entity: entities.shop_banner,
    });
  } else {
    sendDeletionResponse({
      res,
      data,
      entity: entities.shop_banner,
    });
  }
}
//
export default {
  createBanner,
  updateBanner,
  deleteBanner,
  getBanners,
};
