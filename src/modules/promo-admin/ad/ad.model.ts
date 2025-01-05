 
import { Schema, model } from "mongoose";


const ads_schema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Ad title is required."],
    },
    is_active: {
      type: Boolean,
      default: false,
    },
    thumbnail: {
      type: String,
      required: [true, "Ad thumbnail is required."],
    },

    display_page: {
      type: String,
      enum: {
        values: ["Home page", "Contact us", "Product detail"],
        message:
          "Display page must be either 'Home page', 'Contact us', or 'Product detail'.",
      },
      default: "Home page",
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

const Ad = model("ads", ads_schema);

export default Ad;
