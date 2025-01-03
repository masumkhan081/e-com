const { Router } = require("express");
const router = Router();
const paymentGatewayController = require("./paymentGateway.controller");
const validateRequest = require("../../../middlewares/validateRequest");
const { paymentConfigBaseSchema } = require("./paymentGateway.validate");
const accessControl = require("../../../middlewares/verifyToken");
const { allowed_roles } = require("../../../config/constants");
const { uploadPaymentGatewayLogo } = require("../../../utils/uploader");
//
router.patch(
  "/",
  accessControl([allowed_roles.admin]),
  uploadPaymentGatewayLogo,
  validateRequest(paymentConfigBaseSchema),
  paymentGatewayController.createPaymentGateway
);
//
router.get("/", paymentGatewayController.getPaymentGateway);
//
router.delete(
  "/:id",
  accessControl([allowed_roles.admin]),
  paymentGatewayController.deletePaymentGateway
);

module.exports = router;
