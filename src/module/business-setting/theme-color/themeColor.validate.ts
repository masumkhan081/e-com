import { z } from "zod";

const themeColorSchema = z.object({
  hex: z
    .string()
    .min(7)
    .max(7)
    .regex(/^#[0-9A-Fa-f]{6}$/, {
      message: "hex must be a valid hex color (e.g., #FF5733)",
    }),
  type: z.enum([
    "Primary",
    "Secondary",
    "Accent",
    "Background",
    "Text",
    "Link",
    "Border",
    "Hover",
  ]),
});

export default { themeColorSchema };
