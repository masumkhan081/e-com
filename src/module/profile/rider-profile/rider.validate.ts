const { z } = require("zod");

const riderSchema = z.object({
  full_name: z.string().nonempty("Full name is required."),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 characters.")
    .max(15, "Phone number must be at most 15 characters.")
    .nonempty("Phone number is required."),
  email: z
    .string()
    .email("Please enter a valid email address.")
    .nonempty("Email is required."),
  gender: z.enum(["Male", "Female", "Other"], {
    errorMap: () => ({
      message: "Gender must be either Male, Female, or Other.",
    }),
  }),
  dob: z.string().nonempty("Date of birth is required."),
  driver_license: z.string().nonempty("Driver license is required."),
  vehicle_type: z.string().nonempty("Vehicle type is required."),
  address: z.string().nonempty("Address is required."),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(20, "Password must be at most 20 characters.")
    .nonempty("Password is required."),
  confirm_password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(20, "Password must be at most 20 characters.")
    .nonempty("Password is required."),
});

module.exports = { riderSchema };
