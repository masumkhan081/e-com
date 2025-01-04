import { Schema, model } from "mongoose";

const shopSettingSchema = {
  commission: {
    type: Number,
    max: 100, // Assuming maximum commission is 100%
    validate: {
      validator: (v) => v >= 0,
      message: "Commission must be a positive number",
    },
  },
  commission_type: {
    type: String,
    enum: ["PERCENTAGE", "FIXED_AMOUNT"],
    required: true,
  },
  commission_charge: {
    type: String,
    enum: ["PER_ORDER", "MONTHLY"],
    required: true,
  },
  is_pos_panel_enabled: {
    type: Boolean,
    default: false,
  },
  is_shop_reg_required: {
    type: Boolean,
    default: false,
  },
  is_product_add_approval_required: {
    type: Boolean,
    default: false,
  },
  is_product_update_approval_required: {
    type: Boolean,
    default: false,
  },
};

const ShopSetting = model("shop_settings", shopSettingSchema);

export default ShopSetting;
