 
const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const brandSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Brand name is required"],
      unique: true,
      minlength: [3, "Brand name must be at least 3 characters long"],
      maxlength: [50, "Brand name cannot exceed 50 characters"],
      validate: {
        validator: function (v) {
          return /^[a-zA-Z0-9 ]+$/.test(v); // Allows only letters, numbers, and spaces
        },
        message: (props) => `Brand name should not contain special characters.`,
      },
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    logo: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

const Brand = model("brands", brandSchema);

module.exports = Brand;
