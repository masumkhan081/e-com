const { z } = require("zod");

const variant = z.object({
  size: z.string().nonempty({ message: "Size is required" }),
  color: z.string().nonempty({ message: "Color is required" }),
  stock_quantity: z
    .number()
    .min(0, { message: "Stock quantity must be non-negative" }),
  buying_price: z
    .number()
    .positive({ message: "Buying price is required and must be positive" }),
  selling_price: z
    .number()
    .positive({ message: "Selling price is required and must be positive" }),
});
const variant_schema = z.array(variant);
//
const product_schema = z.object({
  name: z.string().nonempty({ message: "Product name is required" }),
  description: z.string().nonempty({ message: "Description is required" }),
  short_description: z
    .string()
    .nonempty({ message: "Short description is required" }),
  shop: z.string().nonempty({ message: "Shop ID is required" }),
  category: z.string().nonempty({ message: "Category ID is required" }),
  sub_category: z
    .array(z.string())
    .nonempty({ message: "At least one Sub-category ID is required" }),
  brand: z.string().nonempty({ message: "Brand ID is required" }),
  unit: z.string().nonempty({ message: "Unit ID is required" }),
  sku: z.string().optional(),

  discount_type: z.enum(["AMOUNT", "PERCENT"], {
    message: "Discount type must be either 'AMOUNT' or 'PERCENT'",
  }),

  minimum_order_quantity: z
    .number()
    .positive({ message: "Minimum order quantity must be a positive number" }),

  product_approval: z
    .enum(["PENDING", "DISAPPROVED", "APPROVED", "CANCELLED", "UNDER_REVIEW"], {
      message:
        "Product approval must be one of 'PENDING', 'DISAPPROVED', 'APPROVED', 'CANCELLED', or 'UNDER_REVIEW'",
    })
    .default("PENDING"),

  is_active: z
    .boolean({ message: "Is active status is required" })
    .default(false),
  review_note: z.string().optional(),
});

module.exports = {
  product_schema,
  variant_schema,
};
