const { Router } = require("express");
const router = Router();
const productController = require("./product.controller");
const { uploadProductImages } = require("../../../utils/uploader");
const accessControl = require("../../../middlewares/verifyToken");
const { allowed_roles } = require("../../../config/constants");
const { productSchema } = require("./product.validate");
const validateRequest = require("../../../middlewares/validateRequest");
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
module.exports = router;
