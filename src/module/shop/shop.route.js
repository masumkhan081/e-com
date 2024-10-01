const { Router } = require("express");
const router = Router();
const shopController = require("./shop.controller");
const { uploadShopCreationFiles } = require("../../utils/uploader");
const { allowedRoles } = require("../../config/constants");
const accessControl = require("../../middlewares/verifyToken");
//
router.post("/", uploadShopCreationFiles, shopController.createShop);
router.get("/", shopController.getShops);
router.patch("/:id", uploadShopCreationFiles, shopController.updateShop);
router.delete("/:id", shopController.deleteShop);
router.patch(
  "/status/:id",
  accessControl(allowedRoles.seller),
  shopController.updateStatusBySeller
);
router.patch(
  "/admin-approval/:id",
  accessControl(allowedRoles.admin),
  shopController.updateApprovalByAdmin
);
//
module.exports = router;
