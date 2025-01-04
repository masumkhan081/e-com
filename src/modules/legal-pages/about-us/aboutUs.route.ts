import { Router } from "express";
const router = Router();
import aboutUsController from "./aboutUs.controller";
import validateRequest from "../../../middlewares/validateRequest";
import { aboutUsSchema } from "./aboutUs.validate";
import accessControl from "../../../middlewares/verifyToken";
import { allowed_roles } from "../../../config/constants";

//

router.get("/", aboutUsController.getAboutUs);
router.patch(
  "/:id",
  accessControl([allowed_roles.admin]),
  validateRequest(aboutUsSchema),
  aboutUsController.updateAboutUs
);

export default router;
