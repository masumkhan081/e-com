 
import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const profile_schema = new Schema(
  {
    full_name: {
      type: String,
      required: [true, "Full name is required."],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required."],
    },
    gender: {
      type: String,
      enum: {
        values: ["Male", "Female", "Other"],
        message: "Gender must be either 'Male', 'Female', or 'Other'.",
      },
    },
    profile: {
      type: String,
    },
    address: {
      type: String,
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

const Seller = model("seller_profiles", profile_schema);

export default Seller;
