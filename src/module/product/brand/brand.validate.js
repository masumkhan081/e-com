const { z } = require("zod");

function isPostBodyValid({ name, is_active }) {

  if (name && category) {
    return { success: true, name, is_active, description, category };
  } else {
    return { success: false, name, is_active, description, category };
  }
}



const brandSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Brand name is required and cannot be empty." })
    .max(3, { message: "Brand name must be at most 3 characters long." }),
  age: z
    .string()
    .min(1, { message: "Brand name is required and cannot be empty." })
    .max(3, { message: "Brand name must be at most 3 characters long." }),
    numb: z
    .number()
    .min(1, { message: "Brand name is required and cannot be empty." })
    .max(3, { message: "Brand name must be at most 3 characters long." }),
  is_active: z.boolean().optional().default(false), // Optional boolean, defaults to false
});

function isPatchBodyValid({ name, is_active, description, category }) {
  // var form = new multiparty.Form();
  // form.parse(req, function (err, fields, files) {

  if (name && category) {
    return { success: true, name, is_active, description, category };
  } else {
    return { success: false, name, is_active, description, category };
  }
}

module.exports = { brandSchema, isPatchBodyValid };
