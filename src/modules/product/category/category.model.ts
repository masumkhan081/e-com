 
import { Schema, model } from "mongoose";


const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    thumbnail: {
      type: String,
      required: false,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

const Categories = model("categories", categorySchema);

export default Categories;
