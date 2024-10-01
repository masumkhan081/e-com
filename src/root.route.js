/* eslint-disable no-unused-vars */
const { Router } = require("express");
const router = Router();
//
//    auth & profiles
const authRoutes = require("./module/auth/user/auth.route");
const customerRoutes = require("./module/profile/customer-profile/customer.route");
const riderRoutes = require("./module/profile/rider-profile/rider.route");
const sellerRoutes = require("./module/profile/seller-profile/profile.route");
//  business setting - admin
const generalSettingRoutes = require("./module/business-setting/general-setting/generalSetting.route");
const businessSettingRoutes = require("./module/business-setting/business-setup/businessSetup.route");
const shopSettingRoutes = require("./module/business-setting/shop-setup/shopSetup.route");
const withdrawSettingRoutes = require("./module/business-setting/withdraw-setup/withdrawSetup.route");
const delChargeRoutes = require("./module/business-setting/delivery-charge/delCharge.route");
const themeColorRoutes = require("./module/business-setting/theme-color/themeColor.route");
const quickLinkRoutes = require("./module/business-setting/quick-link/quickLink.route");
const socialLinkRoutes = require("./module/business-setting/social-link/socialLink.route");
const tktTypeRoutes = require("./module/business-setting/ticket-issue-type/tktType.route");
// third-party config routes - admin
const mailSettingsRoute = require("./module/third-party/mail-config/mailConfig.route");
const smsSettingsRoutes = require("./module/third-party/sms-gateway/smsGateway.route");
const paymentSettingRoutes = require("./module/third-party/payment-gateway/paymentGateway.route");
//  promotion management - admin
const adRoutes = require("./module/promotion-mgmt/ad/ad.route");
const bannerRoutes = require("./module/promotion-mgmt/banner/banner.route");
const couponRoutes = require("./module/promotion-mgmt/coupon/coupon.route");
//  promotion management - seller
const shopBannerRoutes = require("./module/promotion-mgmt-seller/shop-banner/banner.route");
const couponVoucherRoutes = require("./module/promotion-mgmt-seller/coupon-voucher/coupon.route");

//  product & shop related routes - seller part
const shopRoutes = require("./module/shop/shop.route");
const categoryRoutes = require("./module/product/category/category.route");
const subCategoryRoutes = require("./module/product/sub-category/subCategory.route");
const colorRoutes = require("./module/product/color/color.route");
const sizeRoutes = require("./module/product/size/size.route");
const unitRoutes = require("./module/product/unit/unit.route");
const brandRoutes = require("./module/product/brand/brand.route");
const productRoutes = require("./module/product/product/product.route");
//  legal-pages routes
const privacyPolicyRoutes = require("./module/legal-pages/privacy-policy/privacyPolicy.route");
const termsConditionRoutes = require("./module/legal-pages/terms-and-condition/termCondition.route");
const returnRefundPolicyRoutes = require("./module/legal-pages/return-and-refund/returnRefund.route");
const shippingDeliveryRoutes = require("./module/legal-pages/shipping-and-delivery/shippingDelivery.route");
const aboutUsRoutes = require("./module/legal-pages/about-us/aboutUs.route");
const contactUsRoutes = require("./module/legal-pages/contact-us/contactUs.route");
//
const routes = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/sellers",
    route: sellerRoutes,
  },
  {
    path: "/customers",
    route: customerRoutes,
  },
  {
    path: "/riders",
    route: riderRoutes,
  },
  //  ---------------------------------------------------------  promotion-management - admin
  {
    path: "/promotion-management/ads",
    route: adRoutes,
  },
  {
    path: "/promotion-management/banners",
    route: bannerRoutes,
  },
  {
    path: "/promotion-management/coupons",
    route: couponRoutes,
  },
  //  ---------------------------------------------------------  promotion-management - seller
  {
    path: "/promotion/seller/shop-banners",
    route: shopBannerRoutes,
  },
  {
    path: "/promotion/seller/coupon-vouchers",
    route: couponVoucherRoutes,
  },
  //   --------------------------------------------------------- settings  third-party  (admin)
  {
    path: "/settings/email",
    route: mailSettingsRoute,
  },
  {
    path: "/settings/sms",
    route: smsSettingsRoutes,
  },
  {
    path: "/settings/payment",
    route: paymentSettingRoutes,
  },
  //   ---------------------------------------------------------  business setting
  {
    path: "/settings/general",
    route: generalSettingRoutes,
  },
  {
    path: "/settings/business",
    route: businessSettingRoutes,
  },
  {
    path: "/settings/shop",
    route: shopSettingRoutes,
  },
  {
    path: "/settings/withdraw",
    route: withdrawSettingRoutes,
  },
  {
    path: "/settings/theme-color",
    route: themeColorRoutes,
  },
  {
    path: "/settings/delivery-charge",
    route: delChargeRoutes,
  },
  {
    path: "/settings/quick-link",
    route: quickLinkRoutes,
  },
  {
    path: "/settings/social-link",
    route: socialLinkRoutes,
  },
  {
    path: "/settings/ticket-type",
    route: tktTypeRoutes,
  },
  {
    path: "/settings/contact-us",
    route: contactUsRoutes,
  },

  // // ----------------------------------------------------     shop routes
  {
    path: "/shops",
    route: shopRoutes,
  },
  // ------------------------------------------------------  Product routes
  {
    path: "/product/categories",
    route: categoryRoutes,
  },
  {
    path: "/product/sub-categories",
    route: subCategoryRoutes,
  },
  {
    path: "/product/brands",
    route: brandRoutes,
  },
  {
    path: "/product/units",
    route: unitRoutes,
  },
  {
    path: "/product/sizes",
    route: sizeRoutes,
  },
  {
    path: "/product/colors",
    route: colorRoutes,
  },
  {
    path: "/product/products",
    route: productRoutes,
  },
];

routes.forEach((route) => router.use(route?.path, route?.route));

module.exports = router;
