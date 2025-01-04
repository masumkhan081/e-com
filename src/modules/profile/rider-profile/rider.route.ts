import { Router } from "express";
const router = Router();
import riderController from "./rider.controller";
import { uploadRiderProfile } from "../../../utils/uploader";
import { allowed_roles } from "../../../config/constants";
import accessControl from "../../../middlewares/verifyToken";
import validateRequest from "../../../middlewares/validateRequest";
import { riderSchema } from "./rider.validate";
//
router.post(
  "/",
  accessControl([allowed_roles.admin]),
  uploadRiderProfile,
  validateRequest(riderSchema),
  riderController.createRider
);
router.get("/", riderController.getRiders);
router.get("/:id", riderController.getSingleRider);
router.patch(
  "/:id",
  accessControl([allowed_roles.admin]),
  uploadRiderProfile,
  riderController.updateRider
);
router.delete("/:id", riderController.deleteRider);

export default router;
