import { Router } from "express";
const router = Router();
import sizeController from "./size.controller";
import validateRequest from "../../../middlewares/validateRequest";
import { sizeSchema, sizeStatusSchema } from "./size.validate";
import accessControl from "../../../middlewares/verifyToken";
import { allowed_roles } from "../../../config/constants";
//
router.post(
  "/",
  accessControl([allowed_roles.seller]),
  validateRequest(sizeSchema),
  sizeController.createSize
);
router.get("/", accessControl([allowed_roles.seller]), sizeController.getSizes);
//
router.get(
  "/:id",
  accessControl([allowed_roles.seller]),
  sizeController.getSingleSize
);
//
router.patch(
  "/:id",
  accessControl([allowed_roles.seller]),
  sizeController.updateSize
);
//
router.patch(
  "/status/:id",
  accessControl([allowed_roles.seller]),
  validateRequest(sizeStatusSchema),
  sizeController.updateSizeStatus
);
//
router.delete(
  "/:id",
  accessControl([allowed_roles.seller]),
  sizeController.deleteSize
);

export default router;
