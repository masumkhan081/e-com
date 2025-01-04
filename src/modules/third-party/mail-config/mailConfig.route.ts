import { Router } from "express";
const router = Router();
import mailConfigController from "./mailConfig.controller";
import validateRequest from "../../../middlewares/validateRequest";
import { mailConfigSchema } from "./mailConfig.validate";
import accessControl from "../../../middlewares/verifyToken";
import { allowed_roles } from "../../../config/constants";
//
router.get("/", mailConfigController.getMailConfig);
//
router.patch(
  "/",
  accessControl([allowed_roles.admin]),
  validateRequest(mailConfigSchema),
  mailConfigController.updateMailConfig
);
//
export default router;
