const { Router } = require("express");
const router = Router();
const shopController = require("./shop.controller");
const { uploadShopCreationFiles } = require("../../utils/uploader");
const { allowed_roles } = require("../../config/constants");
const accessControl = require("../../middlewares/verifyToken");
//
router.get("/", accessControl([allowed_roles.admin]), shopController.getShops);
//
router.get(
  "/:id",
  accessControl([allowed_roles.admin]),
  shopController.getSingleShop
);
//
router.patch(
  "/:id",
  accessControl([allowed_roles.seller, allowed_roles.admin]),
  uploadShopCreationFiles,
  shopController.updateShop
);
//
// router.delete(
//   "/:id",
//   accessControl([allowed_roles.admin]),
//   shopController.deleteShop
// );
//

module.exports = router;
