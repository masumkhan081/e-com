/* eslint-disable no-unused-vars */
const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const unitSchema = new Schema(
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

const Unit = model("units", unitSchema);

module.exports = Unit;
