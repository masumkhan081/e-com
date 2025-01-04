import { Router } from "express";
const router = Router();
import adController from "./ad.controller";
import { uploadAdThumbnail } from "../../../utils/uploader";
import accessControl from "../../../middlewares/verifyToken";
import { allowed_roles } from "../../../config/constants";
//
router.post("/", accessControl([allowed_roles.admin]), uploadAdThumbnail, adController.createAd);
router.get("/", adController.getAds);
router.get("/:id", adController.getSingleAd);
router.patch("/:id",accessControl([allowed_roles.admin]),  uploadAdThumbnail, adController.updateAd);
router.delete("/:id",accessControl([allowed_roles.admin]),  adController.deleteAd);
//
export default router;
