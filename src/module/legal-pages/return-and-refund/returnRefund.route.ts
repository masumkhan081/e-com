import { Router } from "express";
const router = Router();
import returnRefundController from "./returnRefund.controller";
import { returnRefundSchema } from "./returnRefund.validate";
import accessControl from "../../../middlewares/verifyToken";
import { allowed_roles } from "../../../config/constants";
import validateRequest from "../../../middlewares/validateRequest";
//
router.get("/", returnRefundController.getReturnRefunds);
//
router.patch(
  "/",
  accessControl([allowed_roles.admin]),
  validateRequest(returnRefundSchema),
  returnRefundController.updateReturnRefund
);

export default router;
