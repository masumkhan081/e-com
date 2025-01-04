 
import { Schema, model } from "mongoose";
import mongoose from "mongoose";
//
const product_schema = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: [true, "Product reference is required"], // Required validation with custom message
  },
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "shops",
    required: [true, "Shop reference is required"], // Required validation with custom message
  },
  size: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "sizes",
    required: [true, "Size reference is required"], // Required validation with custom message
  },
  color: {
    type: String,
    required: [true, "Color is required"], // Required validation with custom message
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "brands",
    required: [true, "Brand reference is required"], // Required validation with custom message
  },
  unit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "units",
    required: [true, "Unit reference is required"], // Required validation with custom message
  },
  qty: {
    type: Number,
    required: [true, "Quantity is required"], // Required validation with custom message
    min: [1, "Quantity must be at least 1"], // Minimum validation
    validate: {
      validator: Number.isInteger, // Ensure qty is an integer
      message: "Quantity must be an integer", // Custom error message
    },
  },
  buying_price: {
    type: Number,
    required: [true, "Buying price is required"], // Required validation with custom message
    min: [0, "Buying price must be non-negative"], // Minimum validation
  },
  selling_price: {
    type: Number,
    required: [true, "Selling price is required"], // Required validation with custom message
    min: [0, "Selling price must be non-negative"], // Minimum validation
  },
  discount_type: {
    type: String,
    enum: ["AMOUNT", "PERCENT"],
    required: true,
  },
  discount_amount: {
    type: Number,
    required: function () {
      return this.discount_type === "AMOUNT";
    },
    min: [0, "Discount amount must be at least 0"],
  },
  discount_percentage: {
    type: Number,
    required: function () {
      return this.discount_type === "PERCENT";
    },
    min: [0, "Discount percentage must be at least 0"],
  },
  discount_price: {
    type: Number,
    required: [true, "Discount price is required"], // Required validation with custom message
    min: [0, "Discount price must be non-negative"], // Minimum validation
  },
  //   may be optional
  total_price: {
    type: Number,
    required: [true, "Total price is required"], // Required validation with custom message
    min: [0, "Total price must be non-negative"], // Minimum validation
  },
});

const order_schema = new Schema(
  {
    products: [product_schema],
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    voucher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "coupons",
      default: null,
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "shops",
      required: [true, "Shop reference is required"], // Required validation with custom message
    },
    shipping_address: {
      type: String,
    },
    checkout_time: {
      type: String,
    },
    payment_method: {
      type: String,
      required: true,
      enum: ["CASH_ON_DELIVERY"],
    },
    shipping_charge: {
      type: Number,
      default: 0.0,
    },
    sub_total: {
      type: Number,
      required: true,
    },
    voucher_discount: {
      type: Number,
      default: 0.0,
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
        "RETURNED",
        "RETURN-RECIEVED",
      ],
      default: "PENDING",
    },
    customer_note: {
      type: String,
    },
    return_reason: {
      type: String,
    },
    rider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "riders",
      validate: {
        validator: function (v) {
          // Only validate if the status is PICKUP
          return this.status !== "PICKUP" || v != null;
        },
        message: (props) => `Rider is required when status is PICKUP.`,
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

const Order = model("orders", order_schema);

export default Order;
