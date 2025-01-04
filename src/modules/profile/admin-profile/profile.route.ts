import { Router } from "express";
const router = Router();
import profileController from "./profile.controller";
import { isPatchBodyValid, isPostBodyValid } from "./profile.validate";
//
router.post("/", profileController.createProfile);
router.get("/", profileController.getProfiles);
router.patch("/:id", profileController.updateProfile);
router.delete("/:id", profileController.deleteProfile);
//
export default router;
