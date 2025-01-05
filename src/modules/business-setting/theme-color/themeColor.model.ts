 
import { Schema, model } from "mongoose";


const themeColorSchema = Schema({
  hex: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: [
      "Primary",
      "Secondary",
      "Accent",
      "Background",
      "Accent",
      "Text",
      "Link",
      "Border",
      "Hover",
    ],
  },
});

const ThemeColor = model("theme_colors", themeColorSchema);

export default ThemeColor;
