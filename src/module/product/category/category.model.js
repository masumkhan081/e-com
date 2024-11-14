/* eslint-disable no-unused-vars */
const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    thumbnail: {
      type: String,
      required: false,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

const Categories = model("categories", categorySchema);

module.exports = Categories;
