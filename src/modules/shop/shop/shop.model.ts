
import { Schema, model } from "mongoose";


const shop_schema = new Schema(
  {
    seller: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
      unique: true,
    },
    shop_name: {
      type: String,
      unique: true,
      required: [true, "Shop name is required."],
      minlength: [3, "Shop name must be at least 3 characters long."],
      maxlength: [50, "Shop name must be less than 50 characters."],
    },
    shop_address: {
      type: String,
      required: true,
      minlength: [10, "Shop address must be at least 10 characters long."],
      maxlength: [120, "Shop address must be less than 120 characters."],
    },
    shop_logo: {
      type: String,
    },
    shop_banner: {
      type: String,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: {
        values: [
          "APPROVED",
          "DISAPPROVED",
          "PENDING",
          "CANCELLED",
          "UNDER_REVIEW",
        ],
        message: "{VALUE} is not a valid status.",
      },
      default: "PENDING",
    },
    request_type: {
      type: String,
      enum: ["CREATION", "UPDATE"],
      required: true,
      default: "CREATION",
    },
    review_note: {
      type: String,
      maxlength: [150, "Review on seller shop must be within 150 characters"],
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

const Shop = model("shops", shop_schema);

export default Shop;
