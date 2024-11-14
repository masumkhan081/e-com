const { z } = require("zod");

const ads_schema = z.object({
  title: z.string().nonempty("Ad title is required."), 
  is_active: z.boolean().default(false), 
  display_page: z
    .enum(["Home page", "Contact us", "Product detail"], {
      errorMap: () => ({
        message:
          "Display page must be either 'Home page', 'Contact us', or 'Product detail'.",
      }),
    })
    .default("Home page"),
});

module.exports = { ads_schema };
