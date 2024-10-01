const { Schema, model, default: mongoose } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ["ADMIN", "SELLER", "CUSTOMER"],
      default: "USER",
    },
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: false },
    profile_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

const User = model("users", userSchema);
module.exports = User;
