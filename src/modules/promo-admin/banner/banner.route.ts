import { Router } from "express";
const router = Router();
import bannerController from "./banner.controller";
//
import accessControl from "../../../middlewares/verifyToken";
import { allowed_roles, entities } from "../../../config/constants";
const {
  fieldsMap,
  uploadHandler,
  uploadBannerThumbnail,
} = require("../../../utils/uploader");
//
router.post(
  "/",
  accessControl([allowed_roles.admin]),
  uploadBannerThumbnail,
  bannerController.createBanner
);
//
router.get("/", bannerController.getBanners);
//
router.get("/:id", bannerController.getSingleBanner);
//
router.patch(
  "/:id",
  accessControl([allowed_roles.admin]),
  uploadBannerThumbnail,
  bannerController.updateBanner
);
//
router.delete(
  "/:id",
  accessControl([allowed_roles.admin]),
  bannerController.deleteBanner
);

export default router;
