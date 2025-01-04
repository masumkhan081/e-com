 
import { Router } from "express";
const router = Router();
//    auth & profiles
import authRoutes from "./module/user/user.route";
import customerRoutes from "./module/profile/customer-profile/customer.route";
import riderRoutes from "./module/profile/rider-profile/rider.route";
import sellerRoutes from "./module/profile/seller-profile/profile.route";
//  business setting - admin
import generalSettingRoutes from "./module/business-setting/general-setting/generalSetting.route";
import businessSettingRoutes from "./module/business-setting/business-setup/businessSetup.route";
import shopSettingRoutes from "./module/business-setting/shop-setup/shopSetup.route";
import withdrawSettingRoutes from "./module/business-setting/withdraw-setup/withdrawSetup.route";
import delChargeRoutes from "./module/business-setting/delivery-charge/delCharge.route";
import themeColorRoutes from "./module/business-setting/theme-color/themeColor.route";
import quickLinkRoutes from "./module/business-setting/quick-link/quickLink.route";
import socialLinkRoutes from "./module/business-setting/social-link/socialLink.route";
import tktTypeRoutes from "./module/business-setting/ticket-issue-type/tktType.route";
// third-party config routes - admin
import mailSettingsRoute from "./module/third-party/mail-config/mailConfig.route";
import smsSettingsRoutes from "./module/third-party/sms-gateway/smsGateway.route";
import paymentSettingRoutes from "./module/third-party/payment-gateway/paymentGateway.route";
//  promotion management - admin
import adRoutes from "./module/promo-admin/ad/ad.route";
import bannerRoutes from "./module/promo-admin/banner/banner.route";
//  promotion management - seller
import shopBannerRoutes from "./module/shop/shop-banner/banner.route";
//  product & shop related routes - seller part
import shopRoutes from "./module/shop/shop.route";
import categoryRoutes from "./module/product/category/category.route";
import subCategoryRoutes from "./module/product/sub-category/subCategory.route";
import colorRoutes from "./module/product/color/color.route";
import sizeRoutes from "./module/product/size/size.route";
import unitRoutes from "./module/product/unit/unit.route";
import brandRoutes from "./module/product/brand/brand.route";
import productRoutes from "./module/product/product/product.route";
//  legal-pages routes
import privacyPolicyRoutes from "./module/legal-pages/privacy-policy/privacyPolicy.route";
import termsConditionRoutes from "./module/legal-pages/terms-and-condition/termCondition.route";
import returnRefundPolicyRoutes from "./module/legal-pages/return-and-refund/returnRefund.route";
import shippingDeliveryRoutes from "./module/legal-pages/shipping-and-delivery/shippingDelivery.route";
import aboutUsRoutes from "./module/legal-pages/about-us/aboutUs.route";
import contactUsRoutes from "./module/legal-pages/contact-us/contactUs.route";
//
import cartRoutes from "./module/pos/cart/cart.route";
import orderRoutes from "./module/pos/order/order.route";
import couponRoutes from "./module/pos/coupon/coupon.route";
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
  //  ----------------------------------------- pos related routes
  {
    path: "/pos/orders",
    route: orderRoutes,
  },
  {
    path: "/pos/carts",
    route: cartRoutes,
  },
  //  ---------------------------------------------------------  promotion-management - admin
  {
    path: "/promo-admin/ads",
    route: adRoutes,
  },
  {
    path: "/promo-admin/banners",
    route: bannerRoutes,
  },
  {
    path: "/promo",
    route: couponRoutes,
  },
  //  ---------------------------------------------------------  promotion-management - seller
  {
    path: "/promo-seller/shop-banners",
    route: shopBannerRoutes,
  },
  //  ---------------------------------------------------------- legal pages

  {
    path: "/settings/legal-page/privacy-policy",
    route: privacyPolicyRoutes,
  },
  {
    path: "/settings/legal-page/contact-us",
    route: contactUsRoutes,
  },
  {
    path: "/settings/legal-page/terms-and-conditions",
    route: termsConditionRoutes,
  },
  {
    path: "/settings/legal-page/shipping-and-delivery",
    route: shippingDeliveryRoutes,
  },
  {
    path: "/settings/legal-page/about-us",
    route: aboutUsRoutes,
  },
  {
    path: "/settings/legal-page/return-refund",
    route: returnRefundPolicyRoutes,
  },

  //   --------------------------------------------------------- settings  third-party  (admin)
  {
    path: "/settings/third-party/email",
    route: mailSettingsRoute,
  },
  {
    path: "/settings/third-party/sms",
    route: smsSettingsRoutes,
  },
  {
    path: "/settings/third-party/payment",
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

routes.forEach((route) => router.use(route.path, route.route));

export default router;
