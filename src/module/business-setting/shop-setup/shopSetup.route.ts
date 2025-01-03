const { Router } = require("express");
const router = Router();
const shopSettingController = require("./shopSetup.controller");
const validateRequest = require("../../../middlewares/validateRequest");
const { shopSettingSchema } = require("./shopSetup.validate");
const accessControl = require("../../../middlewares/verifyToken");
const { allowed_roles } = require("../../../config/constants");
//
router.get(
  "/",
  accessControl([allowed_roles.admin]),
  shopSettingController.getShopSettings
);
//
router.patch(
  "/",
  accessControl([allowed_roles.admin]),
  validateRequest(shopSettingSchema),
  shopSettingController.manageShopSetting
);

module.exports = router;
