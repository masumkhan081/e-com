/* eslint-disable no-unused-vars */
const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const couponSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "shops",
      required: true,
    },
    discount_type: {
      type: String,
      required: true,
      enum: ["AMOUNT", "PERCENTAGE"],
    },
    discount: {
      type: Number,
      required: true,
    },
    max_discount_amount: {
      type: Number,
      required: true,
    },
    min_order_amount: {
      type: Number,
      required: true,
    },
    order_limit: {
      type: Number,
      required: true,
    },
    start_time: {
      type: String,
      required: true,
    },
    expire_time: {
      type: String,
      required: true,
    },
    is_active: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

const Coupon = model("coupons", couponSchema);

module.exports = Coupon;
