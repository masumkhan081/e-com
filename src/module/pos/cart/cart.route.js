const { Router } = require("express");
const router = Router();
const cartController = require("./cart.controller");
const accessControl = require("../../../middlewares/verifyToken");
const { allowed_roles } = require("../../../config/constants");
const validateRequest = require("../../../middlewares/validateRequest");
const { cartSchema, checkoutSchema } = require("./cart.validate");
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

module.exports = router;
