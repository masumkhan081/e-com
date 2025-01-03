const { Router } = require("express");
const router = Router();
const businessSetupController = require("./businessSetup.controller");
const validateRequest = require("../../../middlewares/validateRequest");
const { businessSetupSchema } = require("./businessSetup.validate");
const accessControl = require("../../../middlewares/verifyToken");
const { allowed_roles } = require("../../../config/constants");
//
//
router.get(
  "/",
  accessControl([allowed_roles.admin]),
  businessSetupController.getBusinessSetup
);
//
router.patch(
  "/",
  accessControl([allowed_roles.admin]),
  validateRequest(businessSetupSchema),
  businessSetupController.manageBusinessSetup
);

module.exports = router;
