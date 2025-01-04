import { Router } from "express";
const router = Router();
import unitController from "./unit.controller";
import validateRequest from "../../../middlewares/validateRequest";
import { unitSchema, unitStatusSchema } from "./unit.validate";
import accessControl from "../../../middlewares/verifyToken";
import { allowed_roles } from "../../../config/constants";
//
router.post(
  "/",
  accessControl([allowed_roles.seller]),
  validateRequest(unitSchema),
  unitController.createUnit
);
router.get("/", accessControl([allowed_roles.seller]), unitController.getUnits);
//
router.get(
  "/:id",
  accessControl([allowed_roles.seller]),
  unitController.getSingleUnit
);
//
router.patch(
  "/:id",
  accessControl([allowed_roles.seller]),
  unitController.updateUnit
);
//
router.patch(
  "/status/:id",
  accessControl([allowed_roles.seller]),
  validateRequest(unitStatusSchema),
  unitController.updateUnitStatus
);
//
router.delete(
  "/:id",
  accessControl([allowed_roles.seller]),
  unitController.deleteUnit
);

export default router;
