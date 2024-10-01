/* eslint-disable no-unused-vars */
const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const delChargeSchema = new Schema({
  min_ord_qty: {
    type: Number,
    required: true,
  },
  max_ord_qty: {
    type: Number,
    required: true,
  },
  charge: {
    type: Number,
    required: true,
  },
});

const DeliveryCharge = model("delivery_charges", delChargeSchema);

module.exports = DeliveryCharge;
