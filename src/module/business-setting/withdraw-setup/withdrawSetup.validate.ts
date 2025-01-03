const { z } = require("zod");

const withdraw_setting_schema = z.object({
  min_amount: z
    .number()
    .min(0, { message: "Minimum withdraw amount cannot be negative" }),
  max_amount: z
    .number()
    .min(0, { message: "Maximum withdraw amount cannot be negative" }),
  min_day: z.number().min(0, {
    message: "Minimum days between withdrawal requests cannot be negative",
  }),
  withdraw_note: z
    .string()
    .max(500, { message: "Withdraw note cannot be longer than 500 characters" })
    .optional(),
});

module.exports = { withdraw_setting_schema };
