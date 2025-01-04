import { Router } from "express";
const router = Router();
import colorController from "./color.controller";
import validateRequest from "../../../middlewares/validateRequest";
import { colorSchema } from "./color.validate";
import accessControl from "../../../middlewares/verifyToken";
import { allowed_roles } from "../../../config/constants";

router.post(
  "/",
  accessControl([allowed_roles.seller]),
  validateRequest(colorSchema),
  colorController.createColor
);
router.get("/", colorController.getColors);
//
router.get(
  "/:id",
  accessControl([allowed_roles.seller]),
  colorController.getSingleColor
);
//
router.patch(
  "/:id",
  accessControl([allowed_roles.seller]),
  colorController.updateColor
);
//
router.patch(
  "/status/:id",
  accessControl([allowed_roles.seller]),
  colorController.updateColorStatus
);
//
router.delete(
  "/:id",
  accessControl([allowed_roles.seller]),
  colorController.deleteColor
);

export default router;
