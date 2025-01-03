const { Router } = require("express");
const router = Router();
const brandController = require("./brand.controller");
const validateRequest = require("../../../middlewares/validateRequest");
const {
  brandSchema,
  brandStatusSchema,
  brandUpdateSchema,
} = require("./brand.validate");
const accessControl = require("../../../middlewares/verifyToken");
const { allowed_roles } = require("../../../config/constants");
const { uploadBrandLogo } = require("../../../utils/uploader");
//
router.post(
  "/",
  accessControl([allowed_roles.seller]),
  uploadBrandLogo,
  validateRequest(brandSchema),
  brandController.createBrand
);
//
router.patch(
  "/:id",
  accessControl([allowed_roles.seller]),
  uploadBrandLogo,
  validateRequest(brandUpdateSchema),
  brandController.updateBrand
);
//
router.get(
  "/:id",
  accessControl([allowed_roles.seller]),
  brandController.getSingleBrand
);
//
router.get(
  "/",
  accessControl([allowed_roles.seller]),
  brandController.getBrands
);
//
router.delete(
  "/:id",
  accessControl([allowed_roles.seller]),
  brandController.deleteBrand
);

module.exports = router;
