 
const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
//
const product_schema_in_cart = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: [true, "Product reference is required"], // Required validation with custom message
  },
  size: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "sizes",
    // required: [true, "Size reference is required"], // Required validation with custom message
  },
  color: {
    type: String,
    // required: [true, "Color is required"], // Required validation with custom message
  },
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "shops",
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
//

const products_by_shop_schema = new Schema({
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "shops",
    required: true,
  },
  voucher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vouchers",
    default: null, // Initially set to null
  },
  shop_total_price: {
    type: Number,
    required: true, // Assuming this is calculated and stored when cart data is managed
    min: [0, "Total price for the shop must be non-negative"],
  },
  products: {
    type: [product_schema_in_cart],
    validate: {
      validator: function (v) {
        return v && v.length > 0;
      },
      message: "Each shop entry must contain at least one product",
    },
  },
});

const cart_schema = new Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "Customer reference is required"],
    },
    products_by_shop: {
      type: [products_by_shop_schema],
      validate: {
        validator: function (v) {
          return v && v.length > 0;
        },
        message: "Cart must contain products for at least one shop",
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

// Create the Cart model
const Cart = model("carts", cart_schema);

module.exports = Cart;
