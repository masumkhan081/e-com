import { Router } from "express";
const router = Router();
import termConditionController from "./termCondition.controller";
//
import accessControl from "../../../middlewares/verifyToken";
import { allowed_roles } from "../../../config/constants";
import validateRequest from "../../../middlewares/validateRequest";
import { termsAndConditionsSchema } from "./termCondition.validate";

router.get("/", termConditionController.getTermCondition);
router.patch(
  "/",
  accessControl([allowed_roles.admin]),
  validateRequest(termsAndConditionsSchema),
  termConditionController.updateTermCondition
);

export default router;
