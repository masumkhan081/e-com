/* eslint-disable no-unused-vars */
const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const order_schema = new Schema(
  {
    products: {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },
      qty: {},
      unit_price: {},
      total_price: {},
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customers",
      required: true,
    },
    shipping_address: {},
    date_time: {},

    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "shops",
      required: true,
    },
    payment_method: {
      type: String,
      required: true,
      enum: ["Cash Payment", "Razorpay", "Stripe", "Bkash"],
    },
    sub_total: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0.0,
    },
    shipping_charge: {
      type: Number,
      default: 0.0,
    },
    subtotal_after_discount: {
      type: Number,
    },
    total_payable: {
      type: Number,
    },
    status: {
      type: String,
      required: true,
      enum: [
        "PENDING",
        "CONFIRMED",
        "PROCESSING",
        "OUT FOR DELIVERY",
        "DELIVERED",
        "CANCELLED",
        "FAILED",
      ],
      default: "PENDING",
    },
    note: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

const Order = model("orders", order_schema);

module.exports = Order;
