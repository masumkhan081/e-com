const { Router } = require("express");
const router = Router();
const bannerController = require("./banner.controller");
//
const accessControl = require("../../../middlewares/verifyToken");
const { allowed_roles, entities } = require("../../../config/constants");
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

module.exports = router;
