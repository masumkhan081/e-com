import { Router } from "express";
const router = Router();
import paymentGatewayController from "./paymentGateway.controller";
import validateRequest from "../../../middlewares/validateRequest";
import { paymentConfigBaseSchema } from "./paymentGateway.validate";
import accessControl from "../../../middlewares/verifyToken";
import { allowed_roles } from "../../../config/constants";
import { uploadPaymentGatewayLogo } from "../../../utils/uploader";
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

export default router;
