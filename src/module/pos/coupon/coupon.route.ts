const { Router } = require("express");
const router = Router();
const couponController = require("./coupon.controller");
const validateRequest = require("../../../middlewares/validateRequest");
const { coupon_schema } = require("./coupon.validate");
const accessControl = require("../../../middlewares/verifyToken");
const { allowed_roles } = require("../../../config/constants");
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
module.exports = router;
