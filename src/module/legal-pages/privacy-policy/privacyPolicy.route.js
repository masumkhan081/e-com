const { Router } = require("express");
const router = Router();
const privacyPolicyController = require("./privacyPolicy.controller");
const accessControl = require("../../../middlewares/verifyToken");
const { allowed_roles } = require("../../../config/constants");
const validateRequest = require("../../../middlewares/validateRequest");
const { privacyPolicySchema } = require("./privacyPolicy.validate");
//
router.get("/", privacyPolicyController.getPrivacyPolicy);

router.patch(
  "/:id",
  accessControl([allowed_roles.admin]),
  validateRequest(privacyPolicySchema),
  privacyPolicyController.managePrivacyPolicy
);
//
module.exports = router;
