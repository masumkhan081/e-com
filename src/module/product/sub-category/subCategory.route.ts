const { Router } = require("express");
const router = Router();
const subCategoryController = require("./subCategory.controller");
const { uploadSubCatThumbnail } = require("../../../utils/uploader");
const validateRequest = require("../../../middlewares/validateRequest");
const { subCategorySchema } = require("./subCategory.validate");
const accessControl = require("../../../middlewares/verifyToken");
const { allowed_roles } = require("../../../config/constants");
//
router.post(
  "/",
  accessControl([allowed_roles.admin]),
  uploadSubCatThumbnail,
  validateRequest(subCategorySchema),
  subCategoryController.createSubCategory
);
//
router.get("/", subCategoryController.getSubCategories);
//
router.get("/:id", subCategoryController.getSingleSubCategory);
//
router.patch(
  "/:id",
  accessControl([allowed_roles.admin]),
  uploadSubCatThumbnail,
  subCategoryController.updateSubCategory
);
// 
router.delete("/:id", subCategoryController.deleteSubCategory);

module.exports = router;
