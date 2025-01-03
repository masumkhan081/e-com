const z = require("zod");

const categorySchema = z.object({
  name: z
    .string()
    .min(3, "Category name is required with least 3 characters")
    .max(50, "Category name cannot exceed 50 characters")
    .regex(
      /^[a-zA-Z0-9 ]+$/,
      "Category name should not contain special characters"
    ), // No special characters
  is_active: z.boolean().default(false), // Default to false
  description: z
    .string()
    .max(200, "Description cannot exceed 200 characters") // Max length for description
    .regex(
      /^[a-zA-Z0-9 .,!?]+$/,
      "Description should not contain special characters"
    ) // No special characters
    .optional(), // Optional field
});

const categoryUpdateSchema = z
  .object({
    name: z
      .string()
      .min(1, "Category name must be at least 1 character long")
      .max(50, "Category name cannot exceed 50 characters")
      .regex(
        /^[a-zA-Z0-9 ]+$/,
        "Category name should not contain special characters"
      )
      .optional(), // Make name optional
    is_active: z.boolean().optional(), // Make is_active optional
    description: z
      .string()
      .max(200, "Description cannot exceed 200 characters")
      .regex(
        /^[a-zA-Z0-9 .,!?]+$/,
        "Description should not contain special characters"
      )
      .optional(), // Make description optional
  })
  .strict(); // Ensure no additional fields are allowed

module.exports = { categorySchema, categoryUpdateSchema };
