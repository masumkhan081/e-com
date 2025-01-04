 
import { Router } from "express";
const router = Router();
//    auth & profiles
import authRoutes from "./modules/user/user.route";
import customerRoutes from "./modules/profile/customer-profile/customer.route";
import riderRoutes from "./modules/profile/rider-profile/rider.route";
import sellerRoutes from "./modules/profile/seller-profile/profile.route";
//  business setting - admin
import generalSettingRoutes from "./modules/business-setting/general-setting/generalSetting.route";
import businessSettingRoutes from "./modules/business-setting/business-setup/businessSetup.route";
import shopSettingRoutes from "./modules/business-setting/shop-setup/shopSetup.route";
import withdrawSettingRoutes from "./modules/business-setting/withdraw-setup/withdrawSetup.route";
import delChargeRoutes from "./modules/business-setting/delivery-charge/delCharge.route";
import themeColorRoutes from "./modules/business-setting/theme-color/themeColor.route";
import quickLinkRoutes from "./modules/business-setting/quick-link/quickLink.route";
import socialLinkRoutes from "./modules/business-setting/social-link/socialLink.route";
import tktTypeRoutes from "./modules/business-setting/ticket-issue-type/tktType.route";
// third-party config routes - admin
import mailSettingsRoute from "./modules/third-party/mail-config/mailConfig.route";
import smsSettingsRoutes from "./modules/third-party/sms-gateway/smsGateway.route";
import paymentSettingRoutes from "./modules/third-party/payment-gateway/paymentGateway.route";
//  promotion management - admin
import adRoutes from "./modules/promo-admin/ad/ad.route";
import bannerRoutes from "./modules/promo-admin/banner/banner.route";
//  promotion management - seller
import shopBannerRoutes from "./modules/shop/shop-banner/banner.route";
//  product & shop related routes - seller part
import shopRoutes from "./modules/shop/shop.route";
import categoryRoutes from "./modules/product/category/category.route";
import subCategoryRoutes from "./modules/product/sub-category/subCategory.route";
import colorRoutes from "./modules/product/color/color.route";
import sizeRoutes from "./modules/product/size/size.route";
import unitRoutes from "./modules/product/unit/unit.route";
import brandRoutes from "./modules/product/brand/brand.route";
import productRoutes from "./modules/product/product/product.route";
//  legal-pages routes
import privacyPolicyRoutes from "./modules/legal-pages/privacy-policy/privacyPolicy.route";
import termsConditionRoutes from "./modules/legal-pages/terms-and-condition/termCondition.route";
import returnRefundPolicyRoutes from "./modules/legal-pages/return-and-refund/returnRefund.route";
import shippingDeliveryRoutes from "./modules/legal-pages/shipping-and-delivery/shippingDelivery.route";
import aboutUsRoutes from "./modules/legal-pages/about-us/aboutUs.route";
import contactUsRoutes from "./modules/legal-pages/contact-us/contactUs.route";
//
import cartRoutes from "./modules/pos/cart/cart.route";
import orderRoutes from "./modules/pos/order/order.route";
import couponRoutes from "./modules/pos/coupon/coupon.route";
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
