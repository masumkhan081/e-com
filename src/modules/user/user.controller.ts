import userService from "./user.service";
import httpStatus from "http-status";
import config from "../../config/index";
import {} from "../../utils/responseHandler";
import { getHashedPassword, verifyToken } from "../../utils/tokenisation";
import User from "./user.model";
import { sendOTPMail, sendResetMail } from "../../utils/mail";
import Shop from "../shop/shop/shop.model";
import SellerProfile from "../profile/seller-profile/profile.model";
import { allowed_roles, entities } from "../../config/constants";
import { fieldsMap, uploadHandler } from "../../utils/uploader";
import crypto from "crypto-js";

//

export const resendOtp: TypeController = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "No account associated with that email." });
    }

    if (user.is_verified) {
      return res.status(400).json({ message: "Account already verified" });
    }

    const { success, token } = await sendOTPMail(user.email);

    if (success) {
      return res.status(200).json({
        success,
        message: "An OTP has been sent to your email for verification",
        token,
      });
    } else {
      return res.status(400).json({
        success,
        message: "Failed to send OTP. Please try again.",
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Interval server error" });
  }
}

export const registerSeller: TypeController = async (req, res) => {
  try {
    const { email, password, confirm_password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered.",
      });
    }
    //
    if (password !== confirm_password) {
      return res.status(400).json({
        success: false,
        message: "Password and confirm password doesn't match.",
      });
    }
    //
    const existingShop = await Shop.findOne({ shop_name: req.body.shop_name });
    if (existingShop) {
      return res.status(409).json({
        success: false,
        message: "Shop name already registered.",
      });
    }
    //
    const existingSeller = await SellerProfile.findOne({
      phone: req.body.phone,
    });
    if (existingSeller) {
      return res.status(409).json({
        success: false,
        message: "A seller already exist with the phone",
      });
    }

    //
    const paths = {
      shop_banner: "",
      shop_logo: "",
      seller_profile: "",
    };
    const shopFields = fieldsMap[entities.shop];
    const files = req?.files || {};

    for (const { name: fieldName, maxCount } of shopFields) {
      const fieldFiles = files[fieldName];

      if (fieldFiles) {
        if (maxCount === 1) {
          // Single file upload
          paths[fieldName] = await uploadHandler({
            entity: fieldName,
            file: fieldFiles[0],
          });
        } else if (maxCount > 1) {
          // Multiple file uploads handled concurrently with Promise.all
          const uploadPromises = fieldFiles.map((file) =>
            uploadHandler({ entity: fieldName, file })
          );
          paths[fieldName] = await Promise.all(uploadPromises);
        }
      }
    }
    //
    req.body.shop_banner = paths["shop_banner"];
    req.body.shop_logo = paths["shop_logo"];
    req.body.seller_profile = paths["seller_profile"];
    //
    req.body.password = await getHashedPassword(req.body.password);
    req.body.role = allowed_roles.seller;
    //
    await userService.register({
      res,
      data: req.body,
    });
  } catch (error) {
    console.log("controller: registerUser: " + error.message);
    res
      .status(500)
      .json({ success: false, message: "Error processing request" });
  }
}
//
const registerCustomer = async (req, res) => {
  try {
    const { email, password, confirm_password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered.",
      });
    }
    //
    if (password !== confirm_password) {
      return res.status(400).json({
        success: false,
        message: "Password and confirm password doesn't match.",
      });
    }
    req.body.password = await getHashedPassword(req.body.password);
    req.body.role = allowed_roles.customer;
    await userService.register({
      res,
      data: req.body,
    });
  } catch (error) {
    console.log("controller: registerCustomer: " + error.message);
    res
      .status(500)
      .json({ success: false, message: "Error processing request" });
  }
};

export const verifyEmail: TypeController = async (req, res) => {
  try {
    const { otp: otp_from_user, token, email: email_from_user } = req.body;
    // Decrypt OTP token and parse the data
    const {
      expireAt,
      otp: otp_from_token,
      email: email_from_token,
    } = JSON.parse(
      crypto.AES.decrypt(token, config.tkn_secret).toString(crypto.enc.Utf8)
    );

    if (
      otp_from_token !== otp_from_user ||
      email_from_user !== email_from_token
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid token !",
      });
    }
    if (new Date().getTime() > expireAt) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }
    // console.log("User input: ", data.otp, data.email, data.token);
    // console.log("Parsed from token: ", expireAt, otp, email)

    const result = await userService.verifyEmail(email_from_token);
    if (result.is_verified) {
      res
        .status(200)
        .json({ success: true, message: "Account verified. You may login" });
    }
  } catch (error) {
    console.log("err in controller: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const login: TypeController = async (req, res) => {
  try {
    const { email, password } = req.body;
    await userService.login({ res, email, password });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

// export const logout: TypeController = async (req, res) => {
//   res.clearCookie(config.tokenHeaderKey);
//   res.json({ status: 200, message: "User logged out succesfully" });
// }

export const requestAccountRecovery: TypeController = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "No account associated with that email." });
    }

    if (!user.is_verified) {
      return res
        .status(400)
        .json({ message: "Your account is not verified yet." });
    }

    const { success } = await sendResetMail(user.email);

    if (success) {
      return res.status(200).json({
        success,
        message: "A password reset link has been sent to your mail",
      });
    } else {
      return res.status(400).json({
        success,
        message: "Failed to send reset link. Please try again.",
      });
    }
  } catch (error) {
    console.log("err: contrlr: requestAccountRecovery : " + error.message);
    res.status(500).json({ success: false, message: "Interval server error" });
  }
}

export const verifyAccountRecovery: TypeController = async (req, res) => {
  try {
    await userService.verifyAccountRecovery({ token: req.params.token, res });
  } catch (error) {
    res.status(500).json({ success: false, message: "Interval server error" });
  }
}

export const updatePassword: TypeController = async (req, res) => {
  try {
    const { token, email, password, confirm_password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "No account associated with the email." });
    }
    if (password !== confirm_password) {
      return res.status(400).json({
        success: false,
        message: "Password and confirm password do not match.",
      });
    }
    //
    const { success, payload } = verifyToken(token);

    if (!success) {
      return res.status(401).json({
        success: false,
        message: "The provided token is invalid or has changed.",
      });
    }
    if (email !== payload.email) {
      return res.status(400).json({
        success: false,
        message: "Token does not match the email provided",
      });
    }

    if (new Date().getTime() < payload.expireAt) {
      return res.status(400).json({
        success: false,
        message: "Timeout. Request for new password reset link",
      });
    }

    const hashedPassword = await getHashedPassword(password);

    const result = await userService.updatePassword({
      email,
      password: hashedPassword,
    });
    if (result instanceof Error) {
      return res
        .status(500)
        .json({ success: false, message: "Interval server error" });
    } else {
      return res.status(200).json({
        success: true,
        message: "Password updated successfully. You may login",
      });
    }
  } catch (error) {
    console.log("err: " + error.message);
    res.status(500).json({ success: false, message: "Interval server error" });
  }
}

//
export default {
  registerSeller,
  registerCustomer,
  verifyEmail,
  login,
  requestAccountRecovery,
  verifyAccountRecovery,
  updatePassword,
  resendOtp,
};
