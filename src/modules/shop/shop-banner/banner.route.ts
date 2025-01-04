import { Router } from "express";
const router = Router();
import bannerController from "./banner.controller";
import { isPatchBodyValid, isPostBodyValid } from "./banner.validate";
import accessControl from "../../../middlewares/verifyToken";
import { allowed_roles } from "../../../config/constants";
import { uploadShopBanner } from "../../../utils/uploader";
//
router.post(
  "/",
  accessControl([allowed_roles.admin]),
  uploadShopBanner,
  bannerController.createBanner
);
router.get("/", bannerController.getBanners);
router.patch("/:id", uploadShopBanner, bannerController.updateBanner);
router.delete(
  "/:id",
  // accessControl([allowed_roles.admin]),
  bannerController.deleteBanner
);

export default router;
