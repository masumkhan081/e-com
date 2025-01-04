import { Router } from "express";
const router = Router();
import couponController from "./coupon.controller";
import validateRequest from "../../../middlewares/validateRequest";
import { coupon_schema } from "./coupon.validate";
import accessControl from "../../../middlewares/verifyToken";
import { allowed_roles } from "../../../config/constants";
//
//  promo-code admin & seller
router.post(
  "/coupons",
  accessControl([allowed_roles.admin, allowed_roles.seller]),
  validateRequest(coupon_schema),
  couponController.createCoupon
);
//
router.get(
  "/coupons",
  accessControl([allowed_roles.admin, allowed_roles.seller]),
  couponController.getCoupons
);
//
router.patch(
  "/coupons/:id",
  accessControl([allowed_roles.admin, allowed_roles.seller]),
  couponController.updateCoupon
);
//
router.delete("/coupons/:id", couponController.deleteCoupon);
//

router.get("/", couponController.getCoupons);
router.patch("/:id", couponController.updateCoupon);
router.delete("/:id", couponController.deleteCoupon);

//
export default router;
