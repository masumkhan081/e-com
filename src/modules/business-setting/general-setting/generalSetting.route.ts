import { Router } from "express";
const router = Router();
//
import generalSettingController from "./generalSetting.controller";
import { generalSettingSchema } from "./generalSetting.validate";
import { uploadGeneralSettingFiles } from "../../../utils/uploader";
import { allowed_roles } from "../../../config/constants";
import validateRequest from "../../../middlewares/validateRequest";
import accessControl from "../../../middlewares/verifyToken";
//
router.patch(
  "/",
  accessControl([allowed_roles.admin]),
  uploadGeneralSettingFiles,
  validateRequest(generalSettingSchema),
  generalSettingController.manageGeneralSetting
);
router.get(
  "/",
  accessControl([allowed_roles.admin]),
  generalSettingController.getGeneralSettings
);

//
export default router;
