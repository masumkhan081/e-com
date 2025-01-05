 
import { Schema, model } from "mongoose";


const mailConfigSchema = new Schema(
  {
    mail_mailer: {
      type: String,
      required: [true, "Mailer type is required"],
      minLength: [3, "Mailer type must be at least 3 characters"],
      maxLength: [50, "Mailer type must be at most 50 characters"],
    },
    mail_host: {
      type: String,
      required: [true, "Mail host is required"],
      minLength: [3, "Mail host must be at least 3 characters"],
      maxLength: [100, "Mail host must be at most 100 characters"],
    },
    mail_port: {
      type: String,
      required: [true, "Mail port is required"],
      minLength: [2, "Mail port must be at least 2 characters"],
      maxLength: [5, "Mail port must be at most 5 characters"],
    },
    mail_username: {
      type: String,
      required: [true, "Mail username is required"],
      minLength: [3, "Mail username must be at least 3 characters"],
      maxLength: [100, "Mail username must be at most 100 characters"],
    },
    mail_password: {
      type: String,
      required: [true, "Mail password is required"],
      minLength: [8, "Mail password must be at least 8 characters"],
      maxLength: [128, "Mail password must be at most 128 characters"],
    },
    mail_from_address: {
      type: String,
      required: [true, "Mail from address is required"],
      minLength: [5, "Mail from address must be at least 5 characters"],
      maxLength: [100, "Mail from address must be at most 100 characters"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

//
const MailConfig = model("mail_configs", mailConfigSchema);
//
export default MailConfig;
