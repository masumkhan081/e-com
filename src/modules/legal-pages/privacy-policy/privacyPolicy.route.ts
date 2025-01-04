import { Router } from "express";
const router = Router();
import privacyPolicyController from "./privacyPolicy.controller";
import accessControl from "../../../middlewares/verifyToken";
import { allowed_roles } from "../../../config/constants";
import validateRequest from "../../../middlewares/validateRequest";
import { privacyPolicySchema } from "./privacyPolicy.validate";
//
router.get("/", privacyPolicyController.getPrivacyPolicy);

router.patch(
  "/:id",
  accessControl([allowed_roles.admin]),
  validateRequest(privacyPolicySchema),
  privacyPolicyController.managePrivacyPolicy
);
//
export default router;
