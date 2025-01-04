import { Router } from "express";
const router = Router();
import withdrawSetupController from "./withdrawSetup.controller";
import validateRequest from "../../../middlewares/validateRequest";
import { withdraw_setting_schema } from "./withdrawSetup.validate";
import accessControl from "../../../middlewares/verifyToken";
import { allowed_roles } from "../../../config/constants";
//

router.patch(
  "/",
  accessControl([allowed_roles.admin]),
  validateRequest(withdraw_setting_schema),
  withdrawSetupController.manageWithdrawSetting
);
router.get(
  "/",
  accessControl([allowed_roles.admin]),
  withdrawSetupController.getWithdrawSetting
);

export default router;
