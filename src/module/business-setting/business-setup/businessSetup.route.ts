import { Router } from "express";
const router = Router();
import businessSetupController from "./businessSetup.controller";
import validateRequest from "../../../middlewares/validateRequest";
import { businessSetupSchema } from "./businessSetup.validate";
import accessControl from "../../../middlewares/verifyToken";
import { allowed_roles } from "../../../config/constants";
//
//
router.get(
  "/",
  accessControl([allowed_roles.admin]),
  businessSetupController.getBusinessSetup
);
const
  //
  router.patch(
    "/",
    accessControl([allowed_roles.admin]),
    validateRequest(businessSetupSchema),
    businessSetupController.manageBusinessSetup
  );

export default router;
