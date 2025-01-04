 
import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const profile_schema = new Schema(
  {
    full_name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    profile: { type: String },
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

const Profile = model("admin", profile_schema);

export default Profile;
