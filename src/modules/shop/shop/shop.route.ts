import { Router } from "express";
const router = Router();
import shopController from "./shop.controller";
import { uploadShopCreationFiles } from "../../../utils/uploader";
import { allowed_roles } from "../../../config/constants";
import accessControl from "../../../middlewares/verifyToken";
//
router.get("/", accessControl([allowed_roles.admin]), shopController.getShops);
//
router.get(
  "/:id",
  accessControl([allowed_roles.admin]),
  shopController.getSingleShop
);
//
router.patch(
  "/:id",
  accessControl([allowed_roles.seller, allowed_roles.admin]),
  uploadShopCreationFiles,
  shopController.updateShop
);
//
// router.delete(
//   "/:id",
//   accessControl([allowed_roles.admin]),
//   shopController.deleteShop
// );
//

export default router;
