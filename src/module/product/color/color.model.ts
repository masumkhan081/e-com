 
const { Schema, model } = require("mongoose");

const color_schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Color name is required"],
      unique: [true, "Color must be unique."],
      minlength: [3, "Color name must be at least 3 characters long"],
      maxlength: [30, "Color name cannot exceed 30 characters"],
      validate: {
        validator: function (v) {
          return /^[a-zA-Z\s]+$/.test(v); // Allows only letters and spaces
        },
        message: "Color name should contain only letters and spaces",
      },
    },
    hex: {
      type: String,
      required: [true, "Hex color code is required"],
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

const Color = model("colors", color_schema);

module.exports = Color;
