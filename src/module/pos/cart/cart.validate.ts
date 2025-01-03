const { z } = require("zod");
// Define a Zod schema for the product
const productSchemaInCart = z.object({
  product: z.string().nonempty("Product reference is required"),
  size: z.string().nonempty("Size reference is required"),
  color: z.string().nonempty("Color reference is required"),
  qty: z
    .number()
    .min(1, "Quantity must be at least 1")
    .int("Quantity must be an integer")
    .nonnegative("Quantity must be non-negative"),
});

const cartSchema = z.object({
  products: z
    .array(productSchemaInCart)
    .min(1, "At least one product is required"),
});

const checkoutSchema = z.object({
  shipping_address: z.string().min(1, "Shipping address is required"),
  payment_method: z.enum(
    ["CASH_ON_DELIVERY", "CREDIT_CARD", "DEBIT_CARD", "PAYPAL"],
    {
      errorMap: () => ({ message: "Invalid payment method" }),
    }
  ),
  customer_note: z.string().optional(),
  voucher_code: z.string().optional(),
});

module.exports = { cartSchema, checkoutSchema };
