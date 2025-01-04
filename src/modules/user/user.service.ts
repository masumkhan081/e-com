import User from "./user.model";
import bcrypt from "bcrypt";
import { sendOTPMail, sendResetMail } from "../../utils/mail";
import config from "../../config";
import httpStatus from "http-status";
import { getSearchAndPagination } from "../../utils/pagination";
import { entities, allowed_roles } from "../../config/constants";
import jwt from "jsonwebtoken";
import { sendErrorResponse } from "../../utils/responseHandler";
import crypto from "crypto-js";
import { verifyToken, getHashedPassword } from "../../utils/tokenisation";
import CustomerProfile from "../profile/customer-profile/customer.model";
import AdminProfile from "../profile/admin-profile/profile.model";
import SellerProfile from "../profile/seller-profile/profile.model";
import Shop from "../shop/shop.model";

//
async function register({ res, data }) {
  let user;
  let profile;
  let shop;
  let ProfileModel;
  try {
    switch (data.role) {
      case "SELLER":
        ProfileModel = SellerProfile; // Use your Seller Profile model
        break;
      case "CUSTOMER":
        ProfileModel = CustomerProfile; // Use your Customer Profile model
        break;
      default:
        throw new Error("Invalid role provided");
    }

    profile = await ProfileModel.create(data);
    //
    data.profile_id = profile.id;
    user = await User.create(data);
    //
    if (data.role === allowed_roles.seller) {
      data.status = "PENDING";
      data.seller = user.id;
      shop = await Shop.create(data);
    }

    const { success, token } = await sendOTPMail(user.email);

    if (success) {
      res.status(200).json({
        success,
        message: "An OTP has been sent to your email for verification",
        token,
      });
    } else {
      if (profile) {
        await ProfileModel.findByIdAndDelete(profile.id);
      }
      if (user) {
        await User.findByIdAndDelete(user.id);
      }
      if (shop) {
        await Shop.findByIdAndDelete(shop.id);
      }
    }
  } catch (error) {
    if (profile) {
      await ProfileModel.findByIdAndDelete(profile.id);
    }
    if (user) {
      await User.findByIdAndDelete(user.id);
    }
    if (shop) {
      await Shop.findByIdAndDelete(shop.id);
    }
    console.log("service: register:  " + error.message);
    res.status(500).json({ message: "Error creating seller profile" });
  }
}

async function verifyEmail(email) {
  const user = await User.findOneAndUpdate(
    { email },
    { is_verified: true },
    { new: true }
  );
  return user;
}

async function login({ res, email, password }) {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Wrong Credentials" });
    }
    let token;
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Wrong Credentials" });
    }

    if (!user.is_verified) {
      // email and associated password matched but email not-verified yet
      const { success, token } = await sendOTPMail(user.email);
      return res.status(success ? 200 : 400).json({
        success,
        message: success
          ? "Your account is not yet verified. We sent an otp to your mail."
          : "Your account is not veried yet",
        token,
      });
    }

    token = jwt.sign(
      {
        user_id: user.id, // i should remove id from here !
        role: user.role,
        email: user.email,
      },
      config.tkn_secret,
      config.jwt_options
    );
    //
    user.is_active = true; // if previously deleted own profile
    await user.save();
    //
    res.status(200).json({
      success: true,
      message: "You are successfully logged in",
      token,
    });

    // no user with that username in system
  } catch (error) {
    console.error("Inside service func:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

// export const logout: TypeController = async (req, res) => {
//   res.clearCookie(config.tokenHeaderKey);
//   res.status(200).json("Pulled Out Succesfully");
// }
//
async function verifyAccountRecovery({ res, token }) {
  try {
    const { success, payload } = verifyToken(token);

    console.log("payload:   " + JSON.stringify(payload));

    if (!success) {
      return res.status(401).json({
        success: false,
        message: "The provided token is invalid or has changed.",
      });
    }

    const { expireAt, email } = payload;

    // Check if the token has expired
    // if (new Date().getTime() >= expireAt) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Password reset link expired.",
    //   });
    // }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }
    // If everything is valid, allow password update, would expect the token at update password post req
    // return res.status(200).json({
    //   success: true,
    //   message: "You can update your password now.",
    //   token,
    // });

    const frontendResetPasswordUrl = `${config.base_url_client}/reset-password?token=${token}`;
    return res.redirect(frontendResetPasswordUrl);
  } catch (error) {
    console.error("Error in verifyAccountRecovery:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error: " + error.message,
    });
  }
}

async function updatePassword({ email, password }) {
  try {
    const result = await User.findOneAndUpdate(
      { email },
      { password },
      { new: true } // Return the updated document
    );

    return result;
  } catch (error) {
    console.log("err: updatePassword : " + error.message);
    return error;
  }
}

export default {
  register,
  login,
  verifyEmail,
  verifyAccountRecovery,
  updatePassword,
};
