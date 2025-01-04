import { z } from "zod";

const mailConfigSchema = z.object({
  mail_mailer: z
    .string({ required_error: "Mailer type is required" })
    .min(3, { message: "Mailer type must be at least 3 characters" })
    .max(50, { message: "Mailer type must be at most 50 characters" }),

  mail_host: z
    .string({ required_error: "Mail host is required" })
    .min(3, { message: "Mail host must be at least 3 characters" })
    .max(100, { message: "Mail host must be at most 100 characters" }),

  mail_port: z
    .string({ required_error: "Mail port is required" })
    .min(2, { message: "Mail port must be at least 2 characters" })
    .max(5, { message: "Mail port must be at most 5 characters" }),

  mail_username: z
    .string({ required_error: "Mail username is required" })
    .min(3, { message: "Mail username must be at least 3 characters" })
    .max(100, { message: "Mail username must be at most 100 characters" }),

  mail_password: z
    .string({ required_error: "Mail password is required" })
    .min(8, { message: "Mail password must be at least 8 characters" })
    .max(128, { message: "Mail password must be at most 128 characters" }),

  mail_from_address: z
    .string({ required_error: "Mail from address is required" })
    .min(5, { message: "Mail from address must be at least 5 characters" })
    .max(100, { message: "Mail from address must be at most 100 characters" }),
});

export default { mailConfigSchema };
