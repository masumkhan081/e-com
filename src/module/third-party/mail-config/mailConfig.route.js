const { Router } = require("express");
const router = Router();
const mailConfigController = require("./mailConfig.controller");
const validateRequest = require("../../../middlewares/validateRequest");
const { mailConfigSchema } = require("./mailConfig.validate");
const accessControl = require("../../../middlewares/verifyToken");
const { allowed_roles } = require("../../../config/constants");
//
router.get("/", mailConfigController.getMailConfig);
//
router.patch(
  "/",
  accessControl([allowed_roles.admin]),
  validateRequest(mailConfigSchema),
  mailConfigController.updateMailConfig
);
//
module.exports = router;
