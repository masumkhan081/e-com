const { z } = require("zod");

//
const subCategorySchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name is required with least 3 characters" })
    .max(100, { message: "Name must be at most 100 characters long." }),

  is_active: z.boolean().default(false),

  description: z
    .string()
    .max(500, { message: "Description must be at most 500 characters long." })
    .optional(),

  category: z.string(),
});

module.exports = { subCategorySchema };
