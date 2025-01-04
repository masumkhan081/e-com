import { z } from "zod";

export const businessSetupSchema = z.object({
  company_name: z
    .string()
    .min(1, { message: "Company name is required" }) // Making sure it's required
    .max(100, { message: "Company name cannot be longer than 100 characters" }), // Max length validation

  company_email: z
    .string()
    .min(1, { message: "Company email is required" }) // Making sure it's required
    .max(100, { message: "Company email cannot be longer than 100 characters" }) // Max length validation
    .email({ message: "Please provide a valid email address" }), // Email format validation

  company_phone: z
    .string()
    .min(1, { message: "Company phone number is required" }) // Making sure it's required
    .max(20, {
      message: "Company phone number cannot be longer than 20 characters",
    }), // Max length validation

  business_model: z
    .enum(["Single Shop", "Multiple Shop"], {
      errorMap: () => ({
        message:
          "Business model must be either 'Single Shop' or 'Multiple Shop'",
      }), // Enum validation
    })
    .default("Multiple Shop"),

  currency_symbol: z
    .string()
    .max(5, { message: "Currency symbol cannot be longer than 5 characters" }) // Max length validation
    .optional()
    .default("৳"),

  currency_position: z
    .enum(["Prefix", "Suffix"], {
      errorMap: () => ({
        message: "Currency position must be either 'Prefix' or 'Suffix'",
      }), // Enum validation
    })
    .optional()
    .default("Prefix"),

  time_zone: z
    .string()
    .max(50, { message: "Time zone cannot be longer than 50 characters" }) // Max length validation
    .optional(),
}); 
