/* eslint-disable no-unused-vars */
const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
//
const businessSetupSchema = new Schema({
  company_name: {
    type: String,
    required: [true, "Company name is required"],
    max: [100, "Company name cannot be longer than 100 characters"], // Max length validation
  },
  company_email: {
    type: String,
    required: [true, "Company email is required"],
    max: [100, "Company email cannot be longer than 100 characters"], // Max length validation
    match: [/\S+@\S+\.\S+/, "Please provide a valid email address"], // Email format validation
  },
  company_phone: {
    type: String,
    required: [true, "Company phone number is required"],
    max: [20, "Company phone number cannot be longer than 20 characters"], // Max length validation
  },
  business_model: {
    type: String,
    enum: {
      values: ["Single Shop", "Multiple Shop"],
      message: "Business model must be either 'Single Shop' or 'Multiple Shop'", // Enum validation with custom message
    },
    default: "Multiple Shop",
  },
  currency_symbol: {
    type: String,
    required: false,
    default: "৳",
    max: [5, "Currency symbol cannot be longer than 5 characters"], // Max length validation
  },
  currency_position: {
    type: String,
    enum: {
      values: ["Prefix", "Suffix"],
      message: "Currency position must be either 'Prefix' or 'Suffix'", // Enum validation with custom message
    },
    required: false,
    default: "Prefix",
  },
  time_zone: {
    type: String,
    max: [50, "Time zone cannot be longer than 50 characters"], // Max length validation
  },
});

const BusinessSetup = model("business_setup", businessSetupSchema);

module.exports = BusinessSetup;
