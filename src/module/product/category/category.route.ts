const { Router } = require("express");
const router = Router();
const categoryController = require("./category.controller");
const { uploadCatThumbnail } = require("../../../utils/uploader");
//
const accessControl = require("../../../middlewares/verifyToken");
const { allowed_roles } = require("../../../config/constants");
const validateRequest = require("../../../middlewares/validateRequest");
const { categorySchema } = require("./category.validate");
//
router.post(
  "/",
  accessControl([allowed_roles.admin]),
  uploadCatThumbnail,
  validateRequest(categorySchema),
  categoryController.createProductCategory
);
//
router.patch(
  "/:id",
  accessControl([allowed_roles.admin]),
  //   validateRequest(categorySchema),
  uploadCatThumbnail,
  categoryController.updateCategory
);
//
router.get("/", categoryController.getCategories);
//
router.get("/:id", categoryController.getSingleCategory);
//
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
