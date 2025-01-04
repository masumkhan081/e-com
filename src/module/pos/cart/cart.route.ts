import { Router } from "express";
const router = Router();
import cartController from "./cart.controller";
import accessControl from "../../../middlewares/verifyToken";
import { allowed_roles } from "../../../config/constants";
import validateRequest from "../../../middlewares/validateRequest";
import { cartSchema, checkoutSchema } from "./cart.validate";
//
router.patch(
  "/",
  accessControl([allowed_roles.customer]),
  validateRequest(cartSchema),
  cartController.manageCart
);
//
router.post(
  "/apply-coupon",
  accessControl([allowed_roles.customer]),
  cartController.applyCoupon
);
//
router.post(
  "/cart-checkout",
  accessControl([allowed_roles.customer]),
  validateRequest(checkoutSchema),
  cartController.createOrderFromCart
);
//
router.get("/", cartController.getCarts);

router.delete("/:id", cartController.deleteCart);

export default router;
