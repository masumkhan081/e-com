const cartService = require("./cart.service");
const httpStatus = require("http-status");
//
const {
  sendCreateResponse,
  sendDeletionResponse,
  sendErrorResponse,
  sendFetchResponse,
  sendUpdateResponse,
} = require("../../../utils/responseHandler");
const { entities } = require("../../../config/constants");
const Cart = require("./cart.model");
const User = require("../../user/user.model");
const Customer = require("../../profile/customer-profile/customer.model");
const Product = require("../../product/product/product.model");
const Color = require("../../product/color/color.model");
const Coupon = require("../coupon/coupon.model");
const Order = require("../order/order.model");
//
async function manageCart(req, res) {
  try {
    const existing_customer = await User.findById(req.user_id);

    if (!existing_customer) {
      return res.status(400).json({
        success: false,
        message: "Customer doesn't exist",
      });
    }

    const products = req.body.products;
    // Validate for duplicate products
    const uniqueProducts = new Set();
    for (const product of products) {
      const identifier = `${product.product}-${product.size}-${product.color}`;
      if (uniqueProducts.has(identifier)) {
        return res.status(400).json({
          success: false,
          message: `Product with the same size and color cannot be added multiple times: ${product.product}`,
        });
      }
      uniqueProducts.add(identifier);
    }

    let isVariantValid = true;
    const productsByShop = {};

    const updated_products = await Promise.all(
      products.map(async (product) => {
        const { product: product_id, size, color, qty } = product;

        const existing_product = await Product.findOne({
          _id: product_id,
          variants: {
            $elemMatch: { size, color },
          },
        });

        if (!existing_product) {
          isVariantValid = false;
          return res.status(400).json({
            success: false,
            message: `Product with the specified size and color not found.`,
          });
        }

        const variant = existing_product.variants.find(
          (v) => v.size.equals(size) && v.color.equals(color)
        );

        if (!variant) {
          return res.status(400).json({
            success: false,
            message: "Variant not found",
          });
        }

        if (variant.stock_quantity < qty) {
          return res.status(400).json({
            success: false,
            message: `Insufficient stock for product ${existing_product.name}`,
          });
        }

        let discountPrice = variant.selling_price;
        if (existing_product.discount_type === "AMOUNT") {
          discountPrice -= existing_product.discount_amount;
        } else if (existing_product.discount_type === "PERCENT") {
          discountPrice -=
            (variant.selling_price * existing_product.discount_percentage) /
            100;
        }

        if (discountPrice < 0) discountPrice = 0;
        const totalPrice = discountPrice * qty;
        const colorName = await Color.findById(color);

        const updatedProduct = {
          ...product,
          buying_price: variant.buying_price,
          selling_price: variant.selling_price,
          discount_price: discountPrice,
          total_price: totalPrice,
          shop: existing_product.shop,
          color: colorName.name,
        };

        if (!productsByShop[existing_product.shop]) {
          productsByShop[existing_product.shop] = {
            products: [],
            shop_total_price: 0, // Initialize shop total price
          };
        }
        productsByShop[existing_product.shop].products.push(updatedProduct);
        productsByShop[existing_product.shop].shop_total_price += totalPrice;

        return updatedProduct;
      })
    );

    if (!isVariantValid) {
      return;
    }

    const products_by_shop = Object.keys(productsByShop).map((shopId) => ({
      shop: shopId,
      products: productsByShop[shopId].products,
      shop_total_price: productsByShop[shopId].shop_total_price,
    }));

    const existing_cart = await Cart.findOne({
      customer: existing_customer.id,
    });

    if (!existing_cart) {
      const data = await cartService.createCart({
        customer: existing_customer.id,
        products_by_shop: products_by_shop,
      });
      if (data instanceof Error) {
        return sendErrorResponse({
          res,
          error: data,
          entity: entities.cart,
        });
      }
      return sendCreateResponse({
        res,
        data,
        entity: entities.cart,
      });
    }

    const update_result = await cartService.updateCart({
      id: existing_cart.id,
      data: {
        customer: existing_customer.id,
        products_by_shop: products_by_shop,
      },
    });

    if (update_result instanceof Error) {
      return sendErrorResponse({
        res,
        error: update_result,
        entity: entities.cart,
      });
    }
    return sendUpdateResponse({
      res,
      data: update_result,
      entity: entities.cart,
    });
  } catch (error) {
    console.log("controller: manageCart: " + error.message);
    res.status(400).send({ message: "Error processing order request" });
  }
}
//
async function applyCoupon(req, res) {
  try {
    const { promo_code } = req.body;

    const existingCustomer = await User.findById(req.user_id);
    if (!existingCustomer) {
      return res.status(401).json({ success: false, message: "Unauthorized." });
    }

    const existingCart = await Cart.findOne({ customer: existingCustomer._id });
    if (!existingCart || existingCart.products_by_shop.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No active cart or products found",
      });
    }

    if (!promo_code) {
      return res.status(400).json({
        success: false,
        message: "Promo code is required.",
      });
    }

    // Validate the coupon
    const coupon = await Coupon.findOne({ code: promo_code, is_active: true });
    if (!coupon) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid coupon code." });
    }

    const now = new Date();
    if (
      now < new Date(coupon.start_time) ||
      now > new Date(coupon.expire_time)
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Coupon is not valid at this time." });
    }

    console.log("---------1");
    // Process each shop in the cart
    const updatedShops = await Promise.all(
      existingCart.products_by_shop.map(async (shopEntry) => {
        let isCouponApplicable = false;

        // Determine if the coupon applies to this shop
        if (coupon.is_global && coupon.is_admin) {
          isCouponApplicable = true;
        } else if (
          coupon.is_admin &&
          !coupon.is_global &&
          coupon.applicable_shops.includes(shopEntry.shop.toString())
        ) {
          isCouponApplicable = true;
        } else if (!coupon.is_admin && coupon.shop.equals(shopEntry.shop)) {
          isCouponApplicable = true;
        }

        if (isCouponApplicable) {
          let shopTotalPrice = 0;

          // Apply discount to each product and calculate total for the shop
          const discountedProducts = shopEntry.products.map((product) => {
            let discountPrice = product.discount_price; // Use discount_price as base price
            if (coupon.discount_type === "AMOUNT") {
              discountPrice = Math.max(
                0,
                product.discount_price - coupon.discount
              );
            } else if (coupon.discount_type === "PERCENT") {
              discountPrice = Math.max(
                0,
                product.discount_price * (1 - coupon.discount / 100)
              );
            }
            const totalPrice = discountPrice * product.qty;
            shopTotalPrice += totalPrice; // Add to the shop's total price

            return {
              ...product,
              discount_price: discountPrice,
              total_price: totalPrice,
            };
          });

          return {
            ...shopEntry.toObject(),
            voucher: coupon._id, // Apply voucher to this shop
            products: discountedProducts,
            shop_total_price: shopTotalPrice, // Set shop's total price
          };
        }

        // No discount applied for this shop, keep original prices
        const originalShopTotalPrice = shopEntry.products.reduce(
          (total, product) => total + product.total_price,
          0
        );

        return {
          ...shopEntry.toObject(),
          shop_total_price: originalShopTotalPrice,
        };
      })
    );

    // Update the cart with applied vouchers and total prices for each shop
    existingCart.products_by_shop = updatedShops;
    await existingCart.save();

    return res.status(200).json({
      success: true,
      message: "Coupon applied successfully",
      data: existingCart,
    });
  } catch (error) {
    console.log("error: applyCoupon: " + error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
//
async function createOrderFromCart(req, res) {
  try {
    const existingCustomer = await User.findById(req.user_id);
    if (!existingCustomer) {
      return res.status(401).json({ success: false, message: "Unauthorized." });
    }

    const existingCart = await Cart.findOne({
      customer: existingCustomer._id,
    }).populate("products_by_shop.products.product");
    if (!existingCart || existingCart.products_by_shop.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No active cart or products found",
      });
    }

    const orders = [];

    for (const shopEntry of existingCart.products_by_shop) {
      const shopId = shopEntry.shop;
      const products = [];

      for (const item of shopEntry.products) {
        const productDetails = await Product.findById(item.product)
          .populate("unit brand")
          .exec();

        // Calculate discount amount based on discount type
        const discount_amount =
          item.discount_type === "AMOUNT"
            ? item.discount_amount
            : item.discount_type === "PERCENT"
            ? (item.selling_price * item.discount_percentage) / 100
            : 0;

        products.push({
          product: item.product,
          size: item.size,
          color: item.color,
          qty: item.qty,
          buying_price: item.buying_price,
          selling_price: item.selling_price,
          discount_price: item.discount_price,
          total_price: item.total_price,
          discount_type: productDetails.discount_type,
          discount_amount: discount_amount, // Ensure discount_amount is included
          shop: shopId, // Ensure shop is included
          unit: productDetails.unit._id,
          brand: productDetails.brand._id,
        });
      }

      const sub_total = shopEntry.shop_total_price || 0;
      const shipping_charge = req.body.shipping_charge || 0;
      let voucher_discount = 0;

      let applicableCoupon = null;
      if (shopEntry.voucher) {
        applicableCoupon = await Coupon.findById(shopEntry.voucher);
        if (applicableCoupon) {
          const now = new Date();
          if (
            now >= new Date(applicableCoupon.start_time) &&
            now <= new Date(applicableCoupon.expire_time)
          ) {
            const appliesToShop =
              (applicableCoupon.is_global && applicableCoupon.is_admin) ||
              (applicableCoupon.is_admin &&
                applicableCoupon.applicable_shops.includes(
                  shopId.toString()
                )) ||
              (!applicableCoupon.is_admin &&
                applicableCoupon.shop.toString() === shopId.toString());

            if (
              appliesToShop &&
              sub_total >= applicableCoupon.min_order_amount
            ) {
              voucher_discount =
                applicableCoupon.discount_type === "AMOUNT"
                  ? Math.min(
                      applicableCoupon.discount,
                      applicableCoupon.max_discount_amount
                    )
                  : Math.min(
                      (sub_total * applicableCoupon.discount) / 100,
                      applicableCoupon.max_discount_amount
                    );
            }
          }
        }
      }

      const total_payable = sub_total + shipping_charge - voucher_discount;

      const newOrder = await Order.create({
        customer: existingCustomer._id,
        products,
        voucher: applicableCoupon ? applicableCoupon._id : null,
        shop: shopId,
        shipping_address: req.body.shipping_address,
        checkout_time: new Date().toISOString(),
        payment_method: req.body.payment_method,
        shipping_charge,
        sub_total,
        voucher_discount,
        total_payable,
        status: "PENDING",
        customer_note: req.body.customer_note || "",
      });

      orders.push(newOrder);
    }

    await Cart.deleteOne({ customer: existingCustomer._id });

    return res.status(201).json({
      success: true,
      message: "Order(s) created successfully",
      data: orders,
    });
  } catch (error) {
    console.log("Error creating order from cart:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Error creating order from cart" });
  }
}

async function getCarts(req, res) {
  try {
    const data = await cartService.getCarts(req.query);
    if (data instanceof Error) {
      sendErrorResponse({ res, error: data, entity: entities.cart });
    } else {
      sendFetchResponse({ res, data, entity: entities.cart });
    }
  } catch (error) {
    res.status(400).send({ message: "Error fetching orders" });
  }
}
//
async function deleteCart(req, res) {
  const data = await cartService.deleteCart(req.params.id);
  if (data instanceof Error) {
    sendErrorResponse({ res, error: data, entity: entities.cart });
  } else {
    sendDeletionResponse({ res, data, entity: entities.cart });
  }
}
//
module.exports = {
  createOrderFromCart,
  manageCart,
  applyCoupon,
  deleteCart,
  getCarts,
};
