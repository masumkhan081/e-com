import { Router } from "express";
const router = Router();
import categoryController from "./category.controller";
import { uploadCatThumbnail } from "../../../utils/uploader";
//
import accessControl from "../../../middlewares/verifyToken";
import { allowed_roles } from "../../../config/constants";
import validateRequest from "../../../middlewares/validateRequest";
import { categorySchema } from "./category.validate";
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

export default router;
