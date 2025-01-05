
const { Schema } = mongoose;

// Enum values
const gatewayEnum = [
  "STRIPE",
  "PAYPAL",
  "RAZORPAY",
  "PAYSTACK",
  "AAMARPAY",
  "BKASH",
  "PAYTABS",
];

const modeEnum = ["TEST", "LIVE"];

// Base schema for payment configuration
const paymentConfigBaseSchema = new Schema(
  {
    title: { type: String, required: true },
    gateway: { type: String, enum: gatewayEnum, required: true },
    mode: {
      type: String,
      enum: modeEnum,
      default: modeEnum[0],
      required: true,
    },
    logo: { type: String },
    is_active: { type: Boolean, default: false },
  },
  { discriminatorKey: "gatewayType", timestamps: true }
);

// Define specific schemas for each gateway
const RazorpaySchema = new Schema({
  key: { type: String, required: true, minlength: 10 },
  secret: { type: String, required: true },
});

const PaystackSchema = new Schema({
  secret_key: { type: String, required: true },
  published_key: { type: String, required: true },
  merchantEmail: { type: String, required: true },
});

const PayPalSchema = new Schema({
  client_id: { type: String, required: true },
  client_secret: { type: String, required: true },
});

const StripeSchema = new Schema({
  secret_key: { type: String, required: true },
  published_key: { type: String, required: true },
});

const AmarPaySchema = new Schema({
  store_id: { type: String, required: true },
  signature_key: { type: String, required: true },
});

const BkashSchema = new Schema({
  app_key: { type: String, required: true },
  secret_key: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const PayTabsSchema = new Schema({
  base_url: { type: String, required: true },
  currency: { type: String, required: true },
  profile_id: { type: String, required: true },
  server_key: { type: String, required: true },
});

// Create the base model
const PaymentConfig = mongoose.model("payment_gateways", paymentConfigBaseSchema);

// Apply discriminators for each gateway-specific schema
PaymentConfig.discriminator("RAZORPAY", RazorpaySchema);
PaymentConfig.discriminator("PAYSTACK", PaystackSchema);
PaymentConfig.discriminator("STRIPE", StripeSchema);
PaymentConfig.discriminator("PAYPAL", PayPalSchema);
PaymentConfig.discriminator("AAMARPAY", AmarPaySchema);
PaymentConfig.discriminator("BKASH", BkashSchema);
PaymentConfig.discriminator("PAYTABS", PayTabsSchema);

// Export the base model
export default { PaymentConfig, gatewayEnum };
