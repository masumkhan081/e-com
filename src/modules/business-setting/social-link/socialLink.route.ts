import { Router } from "express";
const router = Router();
import socialLinkController from "./socialLink.controller";
import { uploadSocialLink } from "../../../utils/uploader";
//
router.post("/", uploadSocialLink, socialLinkController.createSocialLink);
router.get("/", socialLinkController.getSocialLinks);
router.patch("/:id", uploadSocialLink, socialLinkController.updateSocialLink);
router.delete("/:id", socialLinkController.deleteSocialLink);

export default router;
