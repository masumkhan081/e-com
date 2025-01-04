import { Router } from "express";
const router = Router();
import subCategoryController from "./subCategory.controller";
import { uploadSubCatThumbnail } from "../../../utils/uploader";
import validateRequest from "../../../middlewares/validateRequest";
import { subCategorySchema } from "./subCategory.validate";
import accessControl from "../../../middlewares/verifyToken";
import { allowed_roles } from "../../../config/constants";
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

export default router;
