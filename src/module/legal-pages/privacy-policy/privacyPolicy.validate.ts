const { z } = require("zod");

const privacyPolicySchema = z.object({
  title: z
    .string()
    .max(100, { message: "Title must be at most 100 characters long." }),

  content: z
    .string()
    .max(5000, { message: "Content must be at most 5000 characters long." }),

  is_active: z.boolean().default(true), // Default is true
});

module.exports = { privacyPolicySchema };
