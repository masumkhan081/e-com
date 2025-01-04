 
import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const subCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    thumbnail: {
      type: String,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

const SubCategory = model("sub_categories", subCategorySchema);

export default SubCategory;
