const { z } = require("zod");

// Define a Zod schema for address validation
const addressSchema = z.object({
  district: z.string().min(1).max(50), //
  sub_district: z.string().min(1).max(50), //
  village: z.string().min(1).max(50).optional(), //
  street: z.string().min(1).max(100).optional(), //
  building: z.string().min(1).max(100).optional(), //
});

const registerSchema = z.object({
  email: z.string().min(15).max(75),
  password: z.string().min(6).max(50),
});
const loginSChema = z.object({
  email: z.string().min(15).max(75),
  password: z.string().min(5).max(50),
});

const otpVerSchema = z.object({
  email: z.string().min(15).max(75),
  token: z.string().min(15).max(500),
  otp: z.string().min(4).max(4),
});

const emailVerSchema = z.object({
  email: z.string().min(15).max(75),
});

const resetPassSchema = z.object({
  password: z.string().min(15).max(75),
  confirmPassword: z.string().min(15).max(75),
});

module.exports = {
  addressSchema,
  registerSchema,
  loginSChema,
  emailVerSchema,
  resetPassSchema,
  otpVerSchema,
};
