import { Router } from "express";
const router = Router();
import themeColorController from "./themeColor.controller";
import { themeColorSchema } from "./themeColor.validate";
import validateRequest from "../../../middlewares/validateRequest";
import accessControl from "../../../middlewares/verifyToken";
import { allowed_roles } from "../../../config/constants";
//
router.post(
  "/",
  accessControl([allowed_roles.admin]),
  validateRequest(themeColorSchema),
  themeColorController.createThemeColor
);
//
router.get(
  "/",
  accessControl([allowed_roles.admin]),
  themeColorController.getThemeColors
);
router.patch(
  "/:id",
  accessControl([allowed_roles.admin]),
  themeColorController.updateThemeColor
);
router.delete(
  "/:id",
  accessControl([allowed_roles.admin]),
  themeColorController.deleteThemeColor
);

export default router;
