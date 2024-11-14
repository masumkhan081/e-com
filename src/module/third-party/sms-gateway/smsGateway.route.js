const { Router } = require("express");
const router = Router();
const smsGatewayController = require("./smsGateway.controller");
const {} = require("./smsGateway.validate");
const validateRequest = require("../../../middlewares/validateRequest");
const { smsConfigBaseSchema } = require("./smsGateway.validate");
const accessControll = require("../../../middlewares/verifyToken");
const { allowed_roles } = require("../../../config/constants");
//
router.get(
  "/",
  accessControll([allowed_roles.admin]),
  smsGatewayController.getSmsGateway
);
//
router.patch(
  "/",
  accessControll([allowed_roles.admin]),
  validateRequest(smsConfigBaseSchema),
  smsGatewayController.manageSMSGateway
);
//
router.delete("/:id", smsGatewayController.deleteSmsGateway);

module.exports = router;
