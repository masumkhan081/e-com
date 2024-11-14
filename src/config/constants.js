/* eslint-disable no-unused-vars */

const allowed_roles = {
  admin: "ADMIN",
  seller: "SELLER",
  user: "USER",
  customer: "CUSTOMER",
  rider: "RIDER",
};

const entities = {
  // ---------------------------------------------    product related
  product: "Products",
  product_request: "Product requests",
  // ----------------------------------------------     seller part
  category: "Category",
  sub_category: "Sub category",
  brand: "Brand",
  unit: "Unit",
  size: "Size",
  color: "Color",
  // -----------------------------------------  business setting  (admin)
  business_setup: "Business setup",
  shop_setting: "Shop setting",
  withdraw_setting: "Withdraw setting",
  delivery_charge: "Delivery charge",
  general_setting: "General setting",
  social_link: "Social link",
  quick_link: "Quick link",
  theme_color: "Theme color",
  ticket_type: "Ticket type",
  website_logo: "Website logo",
  textual_logo: "Textual logo",
  // --------------------------------------------------   legal-page  (admin)
  privacy_policy: "Privacy policy",
  terms_and_conditions: "Terms & condition",
  return_and_refund_policy: "Return & refund policy",
  shipping_and_delivery_policy: "Shipping & delivery policy",
  about_us: "About us",
  contact_us: "Contact us",
  // ------------------------------------------------   third-party  (admin)
  payment_gateway: "Payment gateway",
  sms_gateway: "SMS gateway",
  mail_config: "Mail configuration",
  // ------------------------------------------------  promotion management  (admin)
  ad: "Ad",
  banner: "Banner",
  coupon: "Coupon",
  notification: "Notification",
  // ------------------------------------------------  promotion management  (seller)
  shop_banner: "Shop banner",
  coupon_voucher: "Coupon voucher",
  //
  seller_profile: "Seller profile",
  user_profile: "User profile",
  rider: "Rider",
  shop: "Shop",
  cart: "Cart",
  order: "Order",
  delivery: "Delivery",
  users: "Users",
  customer: "Customer",
  sale: "Sale",
  sale_return: "Sale Return",
  support: "Support",
  staff: "Staff",
  profile: "Profile",
  user: "User",
};

const pagination_fields = ["page", "limit", "sort_by", "sort_order"];
const default_view_Limit = 20;
const default_sort_order = "desc";

// may be changed based on the outcome expected
const map_filterables = {
  [entities.shop]: ["is_active", "status", "request_type"],
  [entities.product]: ["category", "status", "adminApproval", "seller"],
  [entities.auction]: ["status", "isFlagged", "timeZone", "seller"],
  [entities.bid]: ["bidder", "auction", "isWinner", "isFlagged"],
  [entities.feedback]: ["reviewer", "auction"],
  [entities.profile]: ["role", "isActive"],
  [entities.bidder]: [],
  [entities.seller]: [],
  [entities.coupon]: ["is_active", "is_admin"],
};

const map_searchables = {
  [entities.product]: ["name", "brand", "category", "sub_category"],
  [entities.product_category]: ["name"],
  [entities.sub_category]: ["name"],
  [entities.product_request]: ["request_id", "product_name"],
  [entities.business_setup]: ["business_name", "address"],
  [entities.delivery_charge]: ["charge_amount", "description"],
  [entities.general_setting]: ["setting_name", "setting_value"],
  [entities.social_link]: ["platform_name", "url"],
  [entities.theme_color]: ["color_name", "hex_value"],
  [entities.contact_us]: ["contact_type", "details"],
  [entities.payment_gateway]: ["gateway_name", "api_key"],
  [entities.sms_gateway]: ["provider_name", "api_key"],
  [entities.mail_config]: ["smtp_host", "smtp_user"],
  [entities.ad]: ["title"],
  [entities.banner]: ["title", "banner_description"],
  [entities.coupon]: ["coupon_code", "description"],
  [entities.coupon_voucher]: ["code"],

  [entities.notification]: ["notification_title", "notification_message"],
  [entities.rider]: ["full_name", "phone"],
  [entities.shop]: ["shop_name"],
  [entities.order]: ["order_id", "customer_name"],
  [entities.delivery]: ["delivery_id", "delivery_address"],
  [entities.users]: ["username", "email"],
  [entities.customer]: ["name", "email"],
  [entities.sale]: ["sale_id", "product_name"],
  [entities.sale_return]: ["return_id", "sale_id"],
  [entities.support]: ["ticket_id", "subject"],
  [entities.staff]: ["staff_name", "staff_id"],
  [entities.brand]: ["name", "is_active"],
  [entities.unit]: ["name"],
  [entities.size]: ["name"],
  [entities.color]: ["name"],
  [entities.profile]: ["user_id", "name"],
  [entities.user]: ["username", "email"], // Adding user as well
};

module.exports = {
  pagination_fields,
  default_view_Limit,
  map_searchables,
  default_sort_order,
  map_filterables,
  entities,
  allowed_roles,
  //
};
