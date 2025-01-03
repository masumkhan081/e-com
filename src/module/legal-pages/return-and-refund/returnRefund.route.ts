const { Router } = require("express");
const router = Router();
const returnRefundController = require("./returnRefund.controller");
const { returnRefundSchema } = require("./returnRefund.validate");
const accessControl = require("../../../middlewares/verifyToken");
const { allowed_roles } = require("../../../config/constants");
const validateRequest = require("../../../middlewares/validateRequest");
//
router.get("/", returnRefundController.getReturnRefunds);
//
router.patch(
  "/",
  accessControl([allowed_roles.admin]),
  validateRequest(returnRefundSchema),
  returnRefundController.updateReturnRefund
);

module.exports = router;
