const z = require("zod");
// Base Zod schema
const smsConfigBaseSchema = z.object({
  gateway: z.enum(["TWILIO", "TELESIGN"]),
  is_active: z.boolean().default(false),
});

const telesignSchema = z.object({
  customer_id: z.string().min(1, "PayPal client ID is required"),
  api_key: z.string().min(1, "PayPal client secret is required"),
});

const twilioSchema = z.object({
  sid: z.string().min(1, "Stripe secret key is required"),
  token: z.string().min(1, "Stripe published key is required"),
  from: z.string().min(1, "Stripe published key is required"),
});

module.exports = {
  smsConfigBaseSchema,
  telesignSchema,
  twilioSchema,
};
