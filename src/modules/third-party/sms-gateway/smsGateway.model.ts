
const { Schema } = mongoose;

// Enum values
const gatewayEnum = ["TWILIO", "TELESIGN"];

// Base schema for payment configuration
const smsConfigSchema = new Schema(
  {
    gateway: { type: String, enum: gatewayEnum, required: true },
    is_active: { type: Boolean, default: false },
  },
  { discriminatorKey: "gateway", timestamps: true }
);

// Define specific schemas for each gateway
const twilioSchema = new Schema({
  sid: { type: String, required: true, minlength: 10 },
  token: { type: String, required: true },
  from: {
    type: String,
    required: true,
  },
});
//
const telesignSchema = new Schema({
  customer_id: { type: String, required: true },
  api_key: { type: String, required: true },
});
// Create the base model
const SMSConfig = mongoose.model("sms_gateways", smsConfigSchema);
//
// Apply discriminators for each gateway-specific schema
SMSConfig.discriminator("TWILIO", twilioSchema);
SMSConfig.discriminator("TELESIGN", telesignSchema);
//
// Export the base model
export default { SMSConfig, gatewayEnum };
