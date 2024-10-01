/* eslint-disable no-unused-vars */
const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  recipient_name: {
    type: String,
    required: true,
  },
  recipient_phone: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Home", "Office", "Other"],
    required: true,
  },
  street_address: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  division: {
    type: String,
    required: true,
  },
  postal_code: {
    type: String,
    required: true,
  },
  is_it_default: {
    type: Boolean,
    required: true,
    default: true,
  },
  country: {
    type: String,
    default: "Bangladesh",
    required: true,
  },
});

const customerSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "profiles",
      required: true,
    },
    addresses: [addressSchema],
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

const Customer = model("customers", customerSchema);

module.exports = Customer;
