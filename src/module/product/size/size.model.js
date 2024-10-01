/* eslint-disable no-unused-vars */
const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const sizeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
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

const Size = model("sizes", sizeSchema);

module.exports = Size;
