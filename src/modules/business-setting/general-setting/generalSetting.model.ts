 
import { Schema, model } from "mongoose";


const footerSectionSchema = new Schema({
  phone: {
    type: String,
    maxLength: [15, "Phone number must be at most 15 characters"],
  },
  email: {
    type: String,
    maxLength: [100, "Email must be at most 100 characters"],
  },
  address: {
    type: String,
    maxLength: [200, "Address must be at most 200 characters"],
  },
  text: {
    type: String,
    maxLength: [100, "Text must be at most 100 characters"],
  },
  description: {
    type: String,
    maxLength: [500, "Description must be at most 500 characters"],
  },
});

const appLinkSchema = new Schema({
  is_app_link_visible: {
    type: Boolean,
    default: true,
  },
  playstore_link: {
    type: String,
    maxLength: [200, "Play Store link must be at most 200 characters"],
  },
  appstore_link: {
    type: String,
    maxLength: [200, "App Store link must be at most 200 characters"],
  },
});

const generalSettingSchema = new Schema(
  {
    website_name: {
      type: String,
      required: [true, "Website name is required"],
      minLength: [3, "Website name must be at least 3 characters"],
      maxLength: [100, "Website name must be at most 100 characters"],
    },
    website_title: {
      type: String,
      required: [true, "Website title is required"],
      minLength: [3, "Website title must be at least 3 characters"],
      maxLength: [100, "Website title must be at most 100 characters"],
    },
    website_logo: {
      type: String,
      required: [true, "Website logo is required"],
      minLength: [3, "Website logo must be at least 3 characters"],
      maxLength: [100, "Website logo must be at most 100 characters"],
    },
    textual_logo: {
      type: String,
      required: [true, "Textual logo is required"],
      minLength: [3, "Textual logo must be at least 3 characters"],
      maxLength: [100, "Textual logo must be at most 100 characters"],
    },
    footer_section: footerSectionSchema,
    app_links: appLinkSchema,
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

const GeneralSetting = model("general_settings", generalSettingSchema);

export default GeneralSetting;
