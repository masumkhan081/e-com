import { z } from "zod";

const colorSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Color name must be at least 3 characters long" })
    .max(30, { message: "Color name cannot exceed 30 characters" })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Color name should contain only letters and spaces",
    }),

  hex: z
    .string()
    .min(3, { message: "Color code must be at least 3 characters long" })
    .max(30, { message: "Color code cannot exceed 30 characters" }),
  is_active: z.boolean().default(false),
});

export default { colorSchema };
