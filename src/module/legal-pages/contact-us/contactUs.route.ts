import { Router } from "express";
const router = Router();
import contactUsController from "./contactUs.controller";
import { contactUsSchema } from "./contactUs.validate";
import accessControl from "../../../middlewares/verifyToken";
import { allowed_roles } from "../../../config/constants";
import validateRequest from "../../../middlewares/validateRequest";
//
router.get("/", contactUsController.getContactUs);
router.patch(
  "/",
  accessControl([allowed_roles.admin]),
  validateRequest(contactUsSchema),
  contactUsController.updateContactUs
);

export default router;
