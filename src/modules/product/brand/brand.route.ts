import { Router } from "express";
const router = Router();
import brandController from "./brand.controller";
import validateRequest from "../../../middlewares/validateRequest";
const {
  brandSchema,
  brandStatusSchema,
  brandUpdateSchema,
} = require("./brand.validate");
import accessControl from "../../../middlewares/verifyToken";
import { allowed_roles } from "../../../config/constants";
import { uploadBrandLogo } from "../../../utils/uploader";
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

export default router;
