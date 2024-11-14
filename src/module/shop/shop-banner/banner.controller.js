const shopBannerService = require("./banner.service");
const ShopBanner = require("./banner.model");
const httpStatus = require("http-status");
//
const { promisify } = require("util");
const fs = require("fs");
const path = require("path");
const unlinkAsync = promisify(fs.unlink);
//
const {
  sendCreateResponse,
  sendDeletionResponse,
  sendErrorResponse,
  sendFetchResponse,
  sendUpdateResponse,
} = require("../../../utils/responseHandler");
const { entities } = require("../../../config/constants");
const { fieldsMap, uploadHandler } = require("../../../utils/uploader");
const { isPostBodyValid } = require("./banner.validate");

async function createBanner(req, res, next) {
  try {
    const valid = isPostBodyValid({ files: req.files, bodyData: req.body });
    let fileUrl;
    //
    console.log("v: " + JSON.stringify(valid));

    if (valid.success) {
      let fieldName = fieldsMap[entities.shop_banner][0].name;
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
async function updateBanner(req, res) {
  try {
    const { title, is_active } = req.body;
    const idUpdatableId = req.params.id;
    let fileUrl;
    //
    try {
      const updatableShopBanner = await ShopBanner.findById(idUpdatableId);
      if (updatableShopBanner) {
        if (req.files["shop_banner"]) {
          let fieldName = fieldsMap[entities.shop_banner][0].name;
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

async function getBanners(req, res) {
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
async function deleteBanner(req, res) {
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
module.exports = {
  createBanner,
  updateBanner,
  deleteBanner,
  getBanners,
};
