const { Router } = require("express");
const router = Router();
const termConditionController = require("./termCondition.controller");
//
const accessControl = require("../../../middlewares/verifyToken");
const { allowed_roles } = require("../../../config/constants");
const validateRequest = require("../../../middlewares/validateRequest");
const { termsAndConditionsSchema } = require("./termCondition.validate");

router.get("/", termConditionController.getTermCondition);
router.patch(
  "/",
  accessControl([allowed_roles.admin]),
  validateRequest(termsAndConditionsSchema),
  termConditionController.updateTermCondition
);

module.exports = router;
