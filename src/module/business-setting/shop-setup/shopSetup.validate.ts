import { z } from "zod";

const shopSettingSchema = z.object({
  commission: z
    .number()
    .min(0, "Commission must be a non-negative number")
    .max(100, "Commission cannot exceed 100"),
  commission_type: z.enum(["PERCENTAGE", "FIXED_AMOUNT"]),
  commission_charge: z.enum(["PER_ORDER", "MONTHLY"]),
  is_pos_panel_enabled: z.boolean().default(false),
  is_shop_reg_required: z.boolean().default(false),
  is_product_add_approval_required: z.boolean().default(false),
  is_product_update_approval_required: z.boolean().default(false),
});

export default { shopSettingSchema };
