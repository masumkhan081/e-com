import { z } from "zod";

const termsAndConditionsSchema = z.object({
  title: z
    .string()
    .max(100, { message: "Title must be at most 100 characters long." })
    .optional(),

  content: z
    .string()
    .max(5000, { message: "Content must be at most 5000 characters long." })
    .optional(),

  is_active: z.boolean().optional(),
});

export default { termsAndConditionsSchema };
