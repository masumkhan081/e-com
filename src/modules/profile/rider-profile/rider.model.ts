 
import { Schema, model } from "mongoose";


const rider_schema = new Schema(
  {
    full_name: {
      type: String,
      required: [true, "Full name is required."],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required."],
      unique: [true, "Phone number must be unique."], // Unique constraint with custom message
      minlength: [10, "Phone number must be at least 10 characters."],
      maxlength: [15, "Phone number must be at most 15 characters."],
    },
    gender: {
      type: String,
      enum: {
        values: ["Male", "Female", "Other"],
        message: "Gender must be either Male, Female, or Other.",
      },
    },
    dob: {
      type: String,
      required: [true, "Date of birth is required."],
    },
    driver_license: {
      type: String,
      required: [true, "Driver license is required."],
    },
    vehicle_type: {
      type: String,
      required: [true, "Vehicle type is required."],
    },
    rider_profile: {
      type: String,
      required: [true, "Rider profile is required."],
    },
    address: {
      type: String,
      required: [true, "Address is required."],
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

const Rider = model("riders", rider_schema);

export default Rider;
