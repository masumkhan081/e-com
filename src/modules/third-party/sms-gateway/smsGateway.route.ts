import { Router } from "express";
const router = Router();
import smsGatewayController from "./smsGateway.controller";
import {} from "./smsGateway.validate";
import validateRequest from "../../../middlewares/validateRequest";
import { smsConfigBaseSchema } from "./smsGateway.validate";
import accessControll from "../../../middlewares/verifyToken";
import { allowed_roles } from "../../../config/constants";
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

export default router;
