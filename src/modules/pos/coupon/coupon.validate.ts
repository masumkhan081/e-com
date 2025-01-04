import { z } from "zod";
import { Types } from "mongoose"; // For ObjectId if necessary, or use z.string() if not
//
const coupon_schema = z.object({
  code: z
    .string()
    .min(5, "Coupon code must be at least 5 characters")
    .max(20, "Coupon code must be at most 20 characters")
    .nonempty("Coupon code is required"),

  applicable_shops: z.array(z.string()).optional(),
  is_admin: z.boolean().default(false),
  is_global: z.boolean().default(false),

  discount_type: z.enum(["AMOUNT", "PERCENT"], {
    required_error: "Discount type is required",
    invalid_type_error: "Discount type must be either 'AMOUNT' or 'PERCENT'",
  }),

  discount: z.number().min(1, "Discount value must be at least 1"),

  max_discount_amount: z
    .number()
    .min(0, "Maximum discount amount must be at least 0"),

  min_order_amount: z
    .number()
    .min(0, "Minimum order amount must be at least 0"),

  max_order_amount: z.number().min(1, "Order limit must be at least 1"),

  start_time: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid start time format",
  }),

  expire_time: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid expire time format",
  }),

  is_active: z.boolean().default(false),
});

export default { coupon_schema };
