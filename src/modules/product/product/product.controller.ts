import productService from "./product.service";
const {
  sendCreateResponse,
  sendDeletionResponse,
  sendErrorResponse,
  sendFetchResponse,
  sendUpdateResponse,
  sendSingleFetchResponse,
} = require("../../../utils/responseHandler");
import { entities, allowed_roles } from "../../../config/constants";
import Product from "./product.model";
import { uploadHandler, fieldsMap } from "../../../utils/uploader";
import { removeFile } from "../../../utils/fileHandle";
import { product_schema, variant_schema } from "./product.validate";
import validateData from "../../../middlewares/validateData";
import Category from "../category/category.model";
import SubCategory from "../sub-category/subCategory.model";
import Unit from "../unit/unit.model";
import Brand from "../brand/brand.model";
import Size from "../size/size.model";
import Color from "../color/color.model";

//
async function createProduct(req, res, next) {
  try {
    req.body.sub_category = req.body.sub_category.split(",");
    req.body.minimum_order_quantity = Number(req.body.minimum_order_quantity);

    const { success, message, messages } = validateData({
      schema: product_schema,
      data: req.body,
    });

    if (!success) {
      return res.status(400).json({ success, message, messages });
    }

    // Check if category exists
    const categoryExists = await Category.exists({ _id: req.body.category });
    if (!categoryExists) {
      return res
        .status(400)
        .json({ success: false, message: "Target category does not exist" });
    }

    // Check if subcategories exist
    const subcategoriesExist = await SubCategory.countDocuments({
      _id: { $in: req.body.sub_category },
    });
    if (subcategoriesExist !== req.body.sub_category.length) {
      return res.status(400).json({
        success: false,
        message: "One or more subcategories do not exist",
      });
    }
    //
    const brandExists = await Brand.exists({ _id: req.body.brand });
    if (!brandExists) {
      return res
        .status(400)
        .json({ success: false, message: "Brand does not exist" });
    }
    //
    const unitExists = await Unit.exists({ _id: req.body.unit });
    if (!unitExists) {
      return res
        .status(400)
        .json({ success: false, message: "Unit does not exist" });
    }
    //

    let arr_variants;
    const { products } = req.body;

    if (products.length > 0) {
      arr_variants = products.map(
        ({ color, size, buying_price, selling_price, stock_quantity }) => ({
          color,
          size,
          buying_price: Number(buying_price),
          selling_price: Number(selling_price),
          stock_quantity: Number(stock_quantity),
        })
      );

      const { success, message, messages } = validateData({
        schema: variant_schema,
        data: arr_variants,
      });

      if (!success) {
        return res.status(400).json({ success, message, messages });
      }

      // Validate that each size and color exists
      const sizeIds = arr_variants.map((variant) => variant.size);
      const colorIds = arr_variants.map((variant) => variant.color);

      const sizesExist = await Size.countDocuments({ _id: { $in: sizeIds } });
      if (sizesExist !== sizeIds.length) {
        return res.status(400).json({
          success: false,
          message: "One or more size values in variants do not exist",
        });
      }

      const colorsExist = await Color.countDocuments({
        _id: { $in: colorIds },
      });
      if (colorsExist !== colorIds.length) {
        return res.status(400).json({
          success: false,
          message: "One or more color values in variants do not exist",
        });
      }
    }

    const { discount_type, discount_amount, discount_percentage } = req.body;
    //

    if (discount_type === "AMOUNT") {
      if (!discount_amount) {
        return res.status(400).json({
          success: false,
          message: "Discount amount is required when discount type is 'AMOUNT'",
        });
      }
      if (isNaN(Number(discount_amount))) {
        return res.status(400).json({
          success: false,
          message: "Discount amount must be a valid number",
        });
      }
    }
    if (discount_type === "PERCENT") {
      if (!discount_percentage) {
        return res.status(400).json({
          success: false,
          message:
            "Discount percent is required when discount type is 'PERCENT'",
        });
      }
      const discountValue = Number(discount_percentage);
      if (isNaN(discountValue) || discountValue < 0 || discountValue > 100) {
        return res.status(400).json({
          success: false,
          message: "Discount percent must be a number between 0 and 100",
        });
      }
    }

    for (let i = 0; i < arr_variants.length; i++) {
      const { selling_price, stock_quantity } = arr_variants[i];

      const discount_value =
        discount_type === "AMOUNT"
          ? discount_amount
          : selling_price * (discount_percentage / 100);

      if (stock_quantity < 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid stock quantity",
        });
      }

      if (discount_value >= selling_price) {
        return res.status(400).json({
          success: false,
          message: "Discount must be lower than selling price",
        });
      }

      arr_variants[i].discount_price = selling_price - discount_value;
    }
    //
    req.body.variants = arr_variants;
    //
    const paths = {
      product_thumbnail: "",
      additional_product_thumbnail: [],
    };

    const productFields = fieldsMap[entities.product];
    const files = req?.files || {};

    for (const { name: fieldName, maxCount } of productFields) {
      const fieldFiles = files[fieldName];

      if (fieldFiles) {
        if (maxCount === 1) {
          // Single file upload
          paths[fieldName] = await uploadHandler({
            entity: fieldName,
            file: fieldFiles[0],
          });
        } else if (maxCount > 1) {
          // Multiple file uploads handled concurrently with Promise.all
          const uploadPromises = fieldFiles.map((file) =>
            uploadHandler({ entity: fieldName, file })
          );
          paths[fieldName] = await Promise.all(uploadPromises);
        }
      }
    }
    //
    req.body.product_thumbnail = paths["product_thumbnail"];
    req.body.additional_product_thumbnail =
      paths["additional_product_thumbnail"];
    //
    const addResult = await Product.create(req.body);

    sendCreateResponse({
      res,
      entity: entities.product,
      data: addResult,
    });
  } catch (error) {
    console.log("controller: create: " + error.message);
    sendErrorResponse({ res, error, entity: entities.product });
  }
}
//
export const updateProduct: TypeController = async (req, res) => {
  const paths = {
    product_thumbnail: "",
    additional_product_thumbnail: [],
  };
  //
  try {
    const product_id = req.params.id;
    const user_role = req.role;
    let update;
    let editResult;
    //
    const updatableProduct = await Product.findById(product_id);
    if (!updatableProduct) {
      return res
        .status(400)
        .json({ success: false, message: "Target product missing" });
    }

    if (req.role === allowed_roles.admin) {
      const { product_approval, review_note } = req.body;
      if (
        [
          "PENDING",
          "DISAPPROVED",
          "APPROVED",
          "CANCELLED",
          "UNDER_REVIEW",
        ].includes(product_approval) ||
        product_approval === undefined
      ) {
        update = {
          review_note: review_note || updatableProduct["review_note"],
          product_approval:
            product_approval || updatableProduct["product_approval"],
        };
        editResult = await Product.findByIdAndUpdate(product_id, update, {
          new: true,
        });
      } else {
        return res.status(400).json({ message: "Invalid status." });
      }
    }
    // if (req.role === allowed_roles.seller) {
    //   let len = fieldsMap[entities.product].length;
    //   //
    //   for (let i = 0; i < len; i++) {
    //     let fieldName = fieldsMap[entities.product][i].name;
    //     let maxCount = fieldsMap[entities.product][i].maxCount;
    //     if (req?.files?.[fieldName]) {
    //       if (maxCount === 1) {
    //         paths[fieldName] = await uploadHandler({
    //           entity: fieldName,
    //           file: req.files[fieldName][0],
    //         });
    //         removeFile({ fileUrl: updatableProduct[fieldName] });
    //       }
    //       if (maxCount > 1) {
    //         console.log("maxC > 1");
    //         for (let i = 0; i < req?.files?.[fieldName].length; i++) {
    //           let fileUrl = await uploadHandler({
    //             entity: fieldName,
    //             file: req.files[fieldName][i],
    //           });
    //           paths[fieldName][i] = fileUrl;
    //         }
    //         for (let i = 0; i < updatableProduct[fieldName]?.length; i++) {
    //           removeFile({ fileUrl: updatableProduct[fieldName][i] });
    //         }
    //       }
    //     }
    //   }
    // }

    // const {
    //   name,
    //   description,
    //   short_description,
    //   category,
    //   sub_category,
    //   color,
    //   brand,
    //   size,
    //   unit,
    //   sku,
    //   shop,
    //   buying_price,
    //   selling_price,
    //   discount_price,
    //   minimum_order_quantity,
    //   current_stock_quantity,
    // } = req.body;

    // editResult = await Product.findByIdAndUpdate(
    //   product_id,
    //   {
    //     ...valid,
    //     product_thumbnail:
    //       paths["product_thumbnail"].length > 0
    //         ? paths["product_thumbnail"]
    //         : updatableProduct.product_thumbnail,
    //     additional_product_thumbnail:
    //       paths["additional_product_thumbnail"].length > 0
    //         ? paths["additional_product_thumbnail"]
    //         : updatableProduct.additional_product_thumbnail,
    //   },
    //   { new: true }
    // );

    sendUpdateResponse({
      res,
      entity: entities.product,
      data: editResult,
    });
  } catch (error) {
    console.log("error controller : " + error.message);
    sendErrorResponse({ res, error, entity: entities.product });
  }
}

export const getProducts: TypeController = async (req, res) => {
  const data = await productService.getProducts(req.query);
  if (data instanceof Error) {
    sendErrorResponse({ res, error: data, entity: entities.product });
  } else {
    sendFetchResponse({ res, data, entity: entities.product });
  }
}
//
export const getSingleProduct: TypeController = async (req, res) => {
  try {
    const data = await productService.getSingleProduct(req.params.id);
    if (data instanceof Error) {
      sendErrorResponse({ res, error: data, entity: entities.product });
    } else {
      sendSingleFetchResponse({
        res,
        data,
        entity: entities.product,
      });
    }
  } catch (error) {
    res.status(400).send({ message: "Error fetching single product" });
  }
}
//
export const deleteProduct: TypeController = async (req, res) => {
  try {
    const data = await productService.deleteProduct(req.params.id);
    if (data instanceof Error) {
      sendErrorResponse({ res, error: data, entity: entities.product });
    } else {
      sendDeletionResponse({
        res,
        data,
        entity: entities.product,
      });
    }
  } catch (error) {
    res.status(400).send({ message: "Error deleting product" });
  }
}

async function updateStatusBySeller(req, res, next) {
  try {
    console.log("role from updateStatusBySeller : " + req.role);
    const updatableId = req.params.id;
    const { is_active } = req.body;
    const existingProduct = await Product.findById(updatableId);
    //
    if (existingProduct) {
      if (is_active === true || is_active === false) {
        const editResult = await Product.findByIdAndUpdate(
          updatableId,
          {
            is_active,
          },
          { new: true }
        );
        sendUpdateResponse({
          res,
          entity: entities.product,
          data: editResult,
        });
      } else {
        res
          .status(400)
          .send({ message: "Invalid request for change of status" });
      }
    } else {
      res.status(400).send({ message: "Id not found" });
    }
  } catch (error) {
    res.status(400).send({ message: "Error updating status" });
  }
}

async function updateApprovalByAdmin(req, res, next) {
  try {
    console.log("role from updateStatusBySeller : " + req.role);
    const updatableId = req.params.id;
    const { product_approval } = req.body;
    const existingProduct = await Product.findById(updatableId);

    if (existingProduct) {
      if (
        [
          "PENDING",
          "DISAPPROVED",
          "APPROVED",
          "CANCELLED",
          "UNDER_REVIEW",
        ].includes(product_approval)
      ) {
        const editResult = await Product.findByIdAndUpdate(
          updatableId,
          {
            product_approval,
          },
          { new: true }
        );
        sendUpdateResponse({
          res,
          entity: entities.product,
          data: editResult,
        });
      } else {
        res
          .status(400)
          .send({ message: "Invalid request for change of status" });
      }
    } else {
      res.status(400).send({ message: "Id not found" });
    }
  } catch (error) {
    res.status(400).send({ message: "Error updating status" });
  }
}

//
export default {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  updateApprovalByAdmin,
  updateStatusBySeller,
  getSingleProduct,
};
