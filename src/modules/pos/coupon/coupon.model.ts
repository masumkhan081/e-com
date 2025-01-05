 
import { Schema, model } from "mongoose";


const coupon_schema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "Coupon code is required"],
      unique: [true, "Coupon already exist. All coupon must be unique"],
      minlength: [5, "Coupon code must be at least 5 characters"],
      maxlength: [20, "Coupon code must be at most 20 characters"],
    },
    applicable_shops: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "shops",
      required: [
        function () {
          return this.is_admin && !this.is_for_all_shop;
        },
        "Shop reference is required for non-global admin coupons",
      ],
    },
    is_admin: {
      type: Boolean,
      default: false,
    },
    is_global: {
      type: Boolean,
      default: false,
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "shops",
      required: [
        function () {
          return !this.is_admin;
        },
        "Shop reference is required for seller coupons",
      ],
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [
        function () {
          return !this.is_admin;
        },
        "Seller reference is required for seller coupons",
      ],
    },
    discount_type: {
      type: String,
      required: [true, "Discount type is required"],
      enum: {
        values: ["AMOUNT", "PERCENT"],
        message: "Discount type must be either 'AMOUNT' or 'PERCENT'",
      },
    },
    discount: {
      type: Number,
      required: [true, "Discount value is required"],
      min: [1, "Discount value must be at least 1"],
      validate: {
        validator: function (value) {
          return this.discount_type === "PERCENT" ? value <= 100 : true;
        },
        message: "Percentage discount cannot exceed 100",
      },
    },
    max_discount_amount: {
      type: Number,
      required: [true, "Maximum discount amount is required"],
      min: [0, "Maximum discount amount must be at least 0"],
      validate: {
        validator: function (value) {
          return this.discount_type === "AMOUNT"
            ? value <= this.discount
            : true;
        },
        message:
          "Maximum discount amount cannot exceed the discount value for 'AMOUNT' type",
      },
    },
    min_order_amount: {
      type: Number,
      required: [true, "Minimum order amount is required"],
      min: [0, "Minimum order amount must be at least 0"],
    },
    max_order_amount: {
      type: Number,
      required: [true, "Order limit is required"],
      min: [1, "Order limit must be at least 1"],
    },
    start_time: {
      type: String,
      required: [true, "Start time is required"],
      validate: {
        validator: function (value) {
          return !isNaN(Date.parse(value));
        },
        message: "Invalid start time format",
      },
    },
    expire_time: {
      type: String,
      required: [true, "Expire time is required"],
      validate: {
        validator: function (value) {
          return !isNaN(Date.parse(value));
        },
        message: "Invalid expire time format",
      },
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

const Coupon = mongoose.model("coupons", coupon_schema);

export default Coupon;
