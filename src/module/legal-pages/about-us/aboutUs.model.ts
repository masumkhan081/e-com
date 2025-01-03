 
const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const aboutUsSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
      minlength: [10, "Title must be at least 10 characters long."],
      maxlength: [100, "Title must be at most 100 characters long."],
    },
    content: {
      type: String,
      required: [true, "Content is required."],
      minlength: [50, "Content must be at least 50 characters long."],
      maxlength: [5000, "Content must be at most 5000 characters long."],
    },
    is_active: {
      type: Boolean,
      default: true, // Set default to true if the policy is active by default
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

const AboutUs = model("about_us", aboutUsSchema);

module.exports = AboutUs;
