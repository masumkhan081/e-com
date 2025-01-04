import { Router } from "express";
const router = Router();
import productController from "./product.controller";
import { uploadProductImages } from "../../../utils/uploader";
import accessControl from "../../../middlewares/verifyToken";
import { allowed_roles } from "../../../config/constants";
import { productSchema } from "./product.validate";
import validateRequest from "../../../middlewares/validateRequest";
//
router.post(
  "/",
  accessControl([allowed_roles.seller]),
  uploadProductImages,
  productController.createProduct
);
//
router.patch(
  "/:id",
  accessControl([allowed_roles.seller, allowed_roles.admin]),
  uploadProductImages,
  productController.updateProduct
);
//
router.get("/", productController.getProducts);
//
router.get("/:id", productController.getSingleProduct);
//
router.delete(
  "/:id",
  accessControl([allowed_roles.seller]),
  productController.deleteProduct
);
//
export default router;
