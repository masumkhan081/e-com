const { Router } = require("express");
const router = Router();
const adController = require("./ad.controller");
const { uploadAdThumbnail } = require("../../../utils/uploader");
const accessControl = require("../../../middlewares/verifyToken");
const { allowed_roles } = require("../../../config/constants");
//
router.post("/", accessControl([allowed_roles.admin]), uploadAdThumbnail, adController.createAd);
router.get("/", adController.getAds);
router.get("/:id", adController.getSingleAd);
router.patch("/:id",accessControl([allowed_roles.admin]),  uploadAdThumbnail, adController.updateAd);
router.delete("/:id",accessControl([allowed_roles.admin]),  adController.deleteAd);
//
module.exports = router;
