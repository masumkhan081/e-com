const { Router } = require("express");
const router = Router();
//
const generalSettingController = require("./generalSetting.controller");
const { generalSettingSchema } = require("./generalSetting.validate");
const { uploadGeneralSettingFiles } = require("../../../utils/uploader");
const { allowed_roles } = require("../../../config/constants");
const validateRequest = require("../../../middlewares/validateRequest");
const accessControl = require("../../../middlewares/verifyToken");
//
router.patch(
  "/",
  accessControl([allowed_roles.admin]),
  uploadGeneralSettingFiles,
  validateRequest(generalSettingSchema),
  generalSettingController.manageGeneralSetting
);
router.get(
  "/",
  accessControl([allowed_roles.admin]),
  generalSettingController.getGeneralSettings
);

//
module.exports = router;
