import couponService from "./coupon.service";
import httpStatus from "http-status";

const {
  sendCreateResponse,
  sendDeletionResponse,
  sendErrorResponse,
  sendFetchResponse,
  sendUpdateResponse,
} = require("../../../utils/responseHandler");
import { entities, allowed_roles } from "../../../config/constants";
import Shop from "../../shop/shop.model";
import Coupon from "./coupon.model";
//
export const createCoupon: TypeController = async (req, res) => {
  try {
    let is_admin = false;
    const { is_global, applicable_shops, start_time, expire_time } = req.body;
    if (req.role === allowed_roles.admin) {
      is_admin = true;
    }
    req.body.is_admin = is_admin;
    //
    //   validation for applicable shop required
    if (is_admin) {
      if (!is_global && (!applicable_shops || applicable_shops.length === 0)) {
        return res.status(400).json({
          success: false,
          message:
            "Applicable shop list is required for non-global admin coupons",
        });
      }
      if (is_global && applicable_shops?.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Global coupon can't be applied to selected shop",
        });
      }
    }

    if (!is_admin) {
      const sellerShop = await Shop.findOne({ seller: req.user_id });
      if (!sellerShop) {
        return res.status(400).json({
          success: false,
          message: "No associated shop found with seller account",
        });
      }
      req.body.seller = req.user_id;
      req.body.shop = sellerShop.id;
    }

    // Parse dates to check format validity
    const startTime = new Date(start_time);
    const expireTime = new Date(expire_time);

    // Check if expire_time is after start_time

    if (startTime && expireTime && expireTime <= startTime) {
      return res.status(400).json({
        success: false,
        message: "Expire time must be after start time",
      });
    }

    const maxDuration = 365 * 24 * 60 * 60 * 1000; // 1 year in milliseconds
    if (startTime && expireTime && expireTime - startTime > maxDuration) {
      return res.status(400).json({
        field: "expire_time",
        message: "Coupon duration cannot exceed one year",
      });
    }

    const data = await couponService.createCoupon(req.body);

    if (data instanceof Error) {
      sendErrorResponse({ res, error: data, entity: entities.coupon });
    } else {
      sendCreateResponse({ res, data, entity: entities.coupon });
    }
  } catch (error) {
    console.log("controller: create : " + error.message);
    res.status(500).json({
      success: false,
      message: "server error",
    });
  }
}
//
export const getCoupons: TypeController = async (req, res) => {
  try {
    const query = {
      is_admin: true,
      is_active: true,
    };

    if (req.role === allowed_roles.seller) {
      console.log("role:: " + req.role);
      query.is_admin = false;
      query.seller = req.user_id;
    }

    console.log(":: " + JSON.stringify(query));

    const data = await couponService.getCoupons(query);
    if (data instanceof Error) {
      sendErrorResponse({ res, error: data, entity: entities.coupon });
    } else {
      sendFetchResponse({ res, data, entity: entities.coupon });
    }
  } catch (error) {
    console.log("controller: create : " + error.message);
    res.status(500).json({
      success: false,
      message: "server error",
    });
  }
}
//
export const updateCoupon: TypeController = async (req, res) => {
  try {
    const targetCoupon = await Coupon.findById(req.params.id);
    let is_admin = targetCoupon?.is_admin;

    if (!targetCoupon) {
      return res.status(404).json({
        success: false,
        message: "No coupon found with this id",
      });
    }

    if (!is_admin && req.user_id !== targetCoupon.seller.toString()) {
      return res.status(404).json({
        success: false,
        message: "The coupon doesn't belong to the user",
      });
    }

    if (is_admin && req.role !== allowed_roles.admin) {
      return res.status(400).json({
        success: false,
        message: "Unauthorized !",
      });
    }

    if (req.role === allowed_roles.admin) {
      is_admin = true;
    }

    const data = await couponService.updateCoupon({
      id: req.params.id,
      data: req.body,
    });
    if (data instanceof Error) {
      console.log("error ...");
      sendErrorResponse({ res, error: data, entity: entities.coupon });
    } else {
      console.log("update ...");
      sendUpdateResponse({ res, data, entity: entities.coupon });
    }
  } catch (error) {
    console.log("controller: create : " + error.message);
    res.status(500).json({
      success: false,
      message: "server error",
    });
  }
}
//
export const deleteCoupon: TypeController = async (req, res) => {
  const data = await couponService.deleteCoupon(req.params.id);
  if (data instanceof Error) {
    sendErrorResponse({ res, error: data, entity: entities.coupon });
  } else {
    sendDeletionResponse({ res, data, entity: entities.coupon });
  }
}
//
export default {
  createCoupon,
  updateCoupon,
  deleteCoupon,
  getCoupons,
};
