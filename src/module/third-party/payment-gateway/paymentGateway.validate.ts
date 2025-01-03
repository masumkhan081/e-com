const z = require("zod");
// Base Zod schema
const paymentConfigBaseSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title cannot exceed 100 characters"),
  gateway: z.enum([
    "STRIPE",
    "PAYPAL",
    "RAZORPAY",
    "PAYSTACK",
    "AAMARPAY",
    "BKASH",
    "PAYTABS",
  ]),
  mode: z.enum(["TEST", "LIVE"]).default("TEST"),
  logo: z.string().optional(),
   
});

const payPalSchema = z.object({
  client_id: z.string().min(1, "PayPal client ID is required"),
  client_secret: z.string().min(1, "PayPal client secret is required"),
});

const stripeSchema = z.object({
  secret_key: z.string().min(1, "Stripe secret key is required"),
  published_key: z.string().min(1, "Stripe published key is required"),
});

const amarPaySchema = z.object({
  store_id: z.string().min(1, "AmarPay store ID is required"),
  signature_key: z.string().min(1, "AmarPay signature key is required"),
});

const bkashSchema = z.object({
  app_key: z.string().min(1, "Bkash app key is required"),
  secret_key: z.string().min(1, "Bkash secret key is required"),
  username: z.string().min(1, "Bkash username is required"),
  password: z.string().min(1, "Bkash password is required"),
});

const payTabsSchema = z.object({
  base_url: z.string().min(1, "PayTabs base URL is required"),
  currency: z.string().min(1, "PayTabs currency is required"),
  profile_id: z.string().min(1, "PayTabs profile ID is required"),
  server_key: z.string().min(1, "PayTabs server key is required"),
});

const razorpaySchema = z.object({
  key: z
    .string()
    .min(10, "Razorpay key must be at least 10 characters")
    .max(255, "Razorpay key cannot exceed 255 characters"),
  secret: z
    .string()
    .min(1, "Razorpay secret is required")
    .max(255, "Razorpay secret cannot exceed 255 characters"),
});

const paystackSchema = z.object({
  secret_key: z
    .string()
    .min(1, "Paystack secret key is required")
    .max(255, "Paystack secret key cannot exceed 255 characters"),
  published_key: z
    .string()
    .min(1, "Paystack published key is required")
    .max(255, "Paystack published key cannot exceed 255 characters"),
  merchantEmail: z
    .string()
    .email("Invalid email format")
    .min(1, "Merchant email is required")
    .max(255, "Merchant email cannot exceed 255 characters"),
});

module.exports = {
  paymentConfigBaseSchema,
  payPalSchema,
  bkashSchema,
  stripeSchema,
  amarPaySchema,
  payTabsSchema,
  razorpaySchema,
  paystackSchema,
};
