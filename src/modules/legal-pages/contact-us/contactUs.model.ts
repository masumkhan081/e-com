import { Schema, model } from "mongoose";

const contactUsSchema = new Schema(
  {
    phone: {
      type: String,
      required: [true, "Phone number is required."], // Custom required message
      minlength: [10, "Phone number must be at least 10 characters long."], // Minimum length validation
      maxlength: [15, "Phone number cannot exceed 15 characters."], // Maximum length validation
    },
    alt_phone: {
      type: String,
      required: [true, "Alternative phone number is required."],
      minlength: [
        10,
        "Alternative phone number must be at least 10 characters long.",
      ],
      maxlength: [15, "Alternative phone number cannot exceed 15 characters."],
    },
    whatsapp: {
      type: String,
      required: [true, "WhatsApp number is required."],
      minlength: [10, "WhatsApp number must be at least 10 characters long."],
      maxlength: [15, "WhatsApp number cannot exceed 15 characters."],
    },
    email: {
      type: String,
      required: [true, "Email address is required."],
      match: [/\S+@\S+\.\S+/, "Please provide a valid email address."], // Email format validation
    },
    messenger_link: {
      type: String,
      required: [true, "Messenger link is required."],
      minlength: [5, "Messenger link must be at least 5 characters long."],
      maxlength: [200, "Messenger link cannot exceed 200 characters."],
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

const ContactUs = model("contact_us", contactUsSchema);

export default ContactUs;
