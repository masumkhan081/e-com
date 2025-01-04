import { Router } from "express";
const router = Router();
import shopSettingController from "./shopSetup.controller";
import validateRequest from "../../../middlewares/validateRequest";
import { shopSettingSchema } from "./shopSetup.validate";
import accessControl from "../../../middlewares/verifyToken";
import { allowed_roles } from "../../../config/constants";
//
router.get(
  "/",
  accessControl([allowed_roles.admin]),
  shopSettingController.getShopSettings
);
//
router.patch(
  "/",
  accessControl([allowed_roles.admin]),
  validateRequest(shopSettingSchema),
  shopSettingController.manageShopSetting
);

export default router;
