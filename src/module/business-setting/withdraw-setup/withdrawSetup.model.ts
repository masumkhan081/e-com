 
const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
//
const withdrawSettingSchema = new Schema(
  {
    min_amount: {
      type: Number,
      required: true,
      min: [0, "Minimum withdraw amount cannot be negative"],
    },
    max_amount: {
      type: Number,
      required: true,
      min: [0, "Maximum withdraw amount cannot be negative"],
    },
    min_day: {
      type: Number,
      required: true,
      min: [0, "Minimum days between withdrawal requests cannot be negative"],
    },
    withdraw_note: {
      type: String,
      max: [500, "Minimum days between withdrawal requests cannot be negative"],
    },
  },
  {
    strict: true,
  }
);

const WithdrawSetting = model("withdraw_settings", withdrawSettingSchema);
module.exports = WithdrawSetting;
