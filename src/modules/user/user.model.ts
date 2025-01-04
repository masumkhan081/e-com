import { Schema, model, default: mongoose } from "mongoose";
import { allowed_roles } from "../../config/constants";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    role: {
      type: String,
      required: [true, "Role is required"],
      enum: {
        values: Object.values(allowed_roles),
        message: "Role must be either ADMIN, SELLER, or BIDDER",
      },
    },
    is_verified: { type: Boolean, default: false },
    is_active: { type: Boolean, default: true }, // at deleting own profile, just switching isActive to false
    profile_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Profile ID is required"],
      unique: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

const User = model("users", userSchema);

export default User;
