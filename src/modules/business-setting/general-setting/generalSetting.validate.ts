import { z } from "zod";

//
const generalSettingSchema = z.object({
  website_name: z
    .string()
    .min(3, { message: "Website name must be at least 3 characters" })
    .max(100, { message: "Website name must be at most 100 characters" }),
  website_title: z
    .string()
    .min(3, { message: "Website title must be at least 3 characters" })
    .max(100, { message: "Website title must be at most 100 characters" }),
  is_app_link_visible: z
    .string()
    .optional()
    .transform((val) => val === "true"),
  playstore_link: z
    .string()
    .max(200, { message: "Play Store link must be at most 200 characters" })
    .optional(),
  appstore_link: z
    .string()
    .max(200, { message: "App Store link must be at most 200 characters" })
    .optional(),
  footer_phone: z
    .string()
    .max(15, { message: "Phone number must be at most 15 characters" }),
  footer_email: z
    .string()
    .max(100, { message: "Email must be at most 100 characters" }),
  footer_address: z
    .string()
    .max(200, { message: "Address must be at most 200 characters" }),
  footer_text: z
    .string()
    .max(100, { message: "Text must be at most 100 characters" }),
  footer_description: z
    .string()
    .max(500, { message: "Description must be at most 500 characters" }),
});

export default { generalSettingSchema };
