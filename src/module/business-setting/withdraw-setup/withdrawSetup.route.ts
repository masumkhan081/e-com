const { Router } = require("express");
const router = Router();
const withdrawSetupController = require("./withdrawSetup.controller");
const validateRequest = require("../../../middlewares/validateRequest");
const { withdraw_setting_schema } = require("./withdrawSetup.validate");
const accessControl = require("../../../middlewares/verifyToken");
const { allowed_roles } = require("../../../config/constants");
//

router.patch(
  "/",
  accessControl([allowed_roles.admin]),
  validateRequest(withdraw_setting_schema),
  withdrawSetupController.manageWithdrawSetting
);
router.get(
  "/",
  accessControl([allowed_roles.admin]),
  withdrawSetupController.getWithdrawSetting
);

module.exports = router;
