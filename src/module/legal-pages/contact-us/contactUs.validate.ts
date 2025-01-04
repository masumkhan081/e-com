import { z } from "zod";

const contactUsSchema = z.object({
  phone: z
    .string()
    .max(15, { message: "Phone number must be at most 15 characters long." })
    .optional(),

  alt_phone: z
    .string()
    .max(15, {
      message: "Alternative phone number must be at most 15 characters long.",
    })
    .optional(),

  whatsapp: z
    .string()
    .max(15, { message: "WhatsApp number must be at most 15 characters long." })
    .optional(),

  email: z
    .string()
    .email({ message: "Email is invalid." })
    .max(55, { message: "Email must be at most 55 characters long." })
    .optional(),

  messenger_link: z
    .string()
    .url({ message: "Messenger link must be a valid URL." })
    .max(100, {
      message: "Messenger link must be at most 100 characters long.",
    })
    .optional(),
});

export default { contactUsSchema };
