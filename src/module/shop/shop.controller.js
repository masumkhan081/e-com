const shopService = require("./shop.service");
const {
  sendDeletionResponse,
  sendErrorResponse,
  sendFetchResponse,
  sendUpdateResponse,
  sendSingleFetchResponse,
} = require("../../utils/responseHandler");
const { entities, allowed_roles } = require("../../config/constants");
const { removeFile } = require("../../utils/fileHandle");
const { fieldsMap, uploadHandler } = require("../../utils/uploader");
//
const Shop = require("./shop.model");
//
async function updateShop(req, res) {
  try {
    const idUpdatableId = req.params.id;
    let paths = {};
    let update;
    //
    const updatableShop = await Shop.findById(idUpdatableId);
    if (!updatableShop) {
      return res
        .status(400)
        .json({ success: false, message: "Target shop missing" });
    }
    if (req.role === allowed_roles.admin) {
      const { status, review_note } = req.body;
      if (
        [
          "APPROVED",
          "DISAPPROVAL",
          "PENDING",
          "CANCELLED",
          "UNDER_REVIEW",
        ].includes(status) ||
        status === undefined
      ) {
        update = {
          review_note: review_note || updatableShop["review_note"],
          status: status || updatableShop["status"],
        };
      } else {
        return res.status(400).json({ message: "Invalid status." });
      }
    }
    if (req.role === allowed_roles.seller) {
      let len = fieldsMap[entities.shop].length;
      //
      for (let i = 0; i < len; i++) {
        let { name: fieldName, maxCount } = fieldsMap[entities.shop][i];
        if (req?.files?.[fieldName]) {
          if (maxCount === 1) {
            paths[fieldName] = await uploadHandler({
              entity: fieldName,
              file: req.files[fieldName][0],
            });
            removeFile({ fileUrl: updatableShop[fieldName] });
          }
          if (maxCount > 1) {
            for (let i = 0; i < req?.files?.[fieldName].length; i++) {
              let fileUrl = await uploadHandler({
                entity: fieldName,
                file: req.files[fieldName][i],
              });
              paths[fieldName][i] = fileUrl;
            }
            for (let i = 0; i < updatableShop[fieldName]?.length; i++) {
              removeFile({ fileUrl: updatableShop[fieldName][i] });
            }
          }
        }
      }
      //
      const { shop_name, shop_address, description, is_active } = req.body;
      update = {
        shop_name: shop_name || updatableShop["shop_name"],
        shop_address: shop_address || updatableShop["shop_address"],
        shop_logo: paths["shop_logo"] || updatableShop["shop_logo"],
        shop_banner: paths["shop_banner"] || updatableShop["shop_banner"],
        description: description || updatableShop["description"],
        is_active:
          is_active !== undefined ? is_active : updatableShop["is_active"],
        request_type: "UPDATE",
      };
    }

    const editResult = await Shop.findByIdAndUpdate(idUpdatableId, update, {
      new: true,
    });

    sendUpdateResponse({
      res,
      entity: entities.shop,
      data: editResult,
    });
  } catch (error) {
    console.log("controller: updateShop " + error.message);
    sendErrorResponse({ res, error, entity: entities.shop });
  }
}
//
async function getShops(req, res) {
  const data = await shopService.getShops(req.query);
  if (data instanceof Error) {
    console.log("error: getShops: " + data.message);
    sendErrorResponse({ res, error: data, entity: entities.shop });
  } else {
    sendFetchResponse({ res, data, entity: entities.shop });
  }
}
//
async function getSingleShop(req, res) {
  const data = await shopService.getSingleShop(req.params.id);
  if (data instanceof Error) {
    sendErrorResponse({ res, error: data, entity: entities.shop });
  } else {
    sendSingleFetchResponse({
      res,
      data,
      entity: entities.shop,
    });
  }
}
//
async function deleteShop(req, res) {
  const data = await shopService.deleteShop(req.params.id);
  if (data instanceof Error) {
    sendErrorResponse({ res, error:data, entity: entities.shop });
  } else {
    sendDeletionResponse({ res, data, entity: entities.shop });
  }
}
//
module.exports = {
  updateShop,
  deleteShop,
  getShops,
  getSingleShop,
};
