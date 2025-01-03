const { z } = require("zod");

const registerSellerSchema = z.object({
  email: z
    .string()
    .email("Invalid email address. Please provide a valid email format.")
    .nonempty("Email is required and cannot be empty."),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters long.")
    .nonempty("Password is required and cannot be empty."),

  full_name: z.string().min(1, "Full name is required and cannot be empty."),

  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits.")
    .max(15, "Phone number cannot exceed 15 digits.")
    .nonempty("Phone number is required."),

  gender: z.enum(["Male", "Female", "Other"]).optional(),

  address: z
    .string()
    .max(100, "Address must be less than 100 characters.")
    .optional(),

  shop_name: z
    .string()
    .min(3, "Shop name must be at least 3 characters.")
    .max(50, "Shop name must be less than 50 characters.")
    .nonempty("Shop name is required and cannot be empty."),

  shop_address: z
    .string()
    .min(10, "Shop address must be at least 10 characters.")
    .max(120, "Shop address must be less than 120 characters.")
    .nonempty("Shop address is required and cannot be empty."),

  description: z
    .string()
    .max(150, "Description must be less than 150 characters.")
    .optional(),
});

const registerCustomerSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email format" })
    .nonempty({ message: "Email is required" }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(20, { message: "Password must be at most 20 characters long" })
    .nonempty({ message: "Password is required" }),

  full_name: z
    .string()
    .min(1, { message: "Full name is required" })
    .max(50, { message: "Full name must be at most 50 characters long" }),

  phone: z.string().nonempty({ message: "Phone number is required" }),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
  address: z.string().optional(),
});
//
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(20, { message: "Password must be no more than 20 characters" }),
});
//
const otpVerSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  token: z.string().min(15).max(500),
  otp: z.string().min(4).max(6),
});

const emailSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

const resetPassSchema = z.object({
  token: z.string().min(15).max(500),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(20, { message: "Password must be no more than 20 characters" }),
  confirm_password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(20, { message: "Password must be no more than 20 characters" }),
});

module.exports = {
  registerCustomerSchema,
  registerSellerSchema,
  loginSchema,
  emailSchema,
  resetPassSchema,
  otpVerSchema,
};
