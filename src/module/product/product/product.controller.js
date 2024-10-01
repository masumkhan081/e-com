const productService = require("./product.service");
const httpStatus = require("http-status");

const {
  sendCreateResponse,
  sendDeletionResponse,
  sendErrorResponse,
  sendFetchResponse,
  sendUpdateResponse,
} = require("../../../utils/responseHandler");
const { operableEntities } = require("../../../config/constants");
const Product = require("./product.model");
const { uploadHandler, fieldsMap } = require("../../../utils/uploader");
const { removeFile } = require("../../../utils/fileHandle");
const { isPostBodyValid, isPatchBodyValid } = require("./product.validate");
const { trusted } = require("mongoose");

async function createProduct(req, res, next) {
  try {
    const valid = isPostBodyValid({ files: req.files, bodyData: req.body });
    let paths = {
      product_thumbnail: "",
      additional_product_thumbnail: [],
    };
    let fileUrl;
    console.log("valid:  " + JSON.stringify(valid));
    //
    if (valid.success) {
      //
      let len = fieldsMap[operableEntities.product].length;
      for (let i = 0; i < len; i++) {
        let fieldName = fieldsMap[operableEntities.product][i].name;
        let maxCount = fieldsMap[operableEntities.product][i].maxCount;
        if (req?.files?.[fieldName]) {
          if (maxCount === 1) {
            paths[fieldName] = await uploadHandler({
              what: fieldName,
              file: req.files[fieldName][0],
            });
          }
          if (maxCount > 1) {
            console.log("maxC > 1");
            for (let i = 0; i < req?.files?.[fieldName].length; i++) {
              let fileUrl = await uploadHandler({
                what: fieldName,
                file: req.files[fieldName][i],
              });
              paths[fieldName][i] = fileUrl;
            }
            console.log(JSON.stringify(paths));
          }
        }
      }
      try {
        const addResult = await Product.create({
          name: valid.name,
          description: valid.description,
          short_description: valid.short_description,
          category: valid.category,
          sub_category: valid.sub_category,
          color: valid.color,
          brand: valid.brand,
          size: valid.size,
          unit: valid.unit,
          sku: valid.sku,
          shop: valid.shop,
          buying_price: valid.buying_price,
          selling_price: valid.selling_price,
          discount_price: valid.discount_price,
          is_active: valid.is_active,
          product_approval: valid.product_approval,
          minimum_order_quantity: valid.minimum_order_quantity,
          current_stock_quantity: valid.current_stock_quantity,
          product_thumbnail: paths["product_thumbnail"],
          additional_product_thumbnail: paths["additional_product_thumbnail"],
        });

        sendCreateResponse({
          res,
          what: operableEntities.product,
          data: addResult,
        });
      } catch (error) {
        removeFile({ fileUrl });
        sendErrorResponse({ res, error, what: operableEntities.product });
      }
    } else {
      res.status(400).send({ message: valid.message });
    }
  } catch (error) {
    sendErrorResponse({ res, error, what: operableEntities.product });
  }
}
//
async function updateProduct(req, res) {
  try {
    const idUpdatableProduct = req.params.id;
    let paths = {
      product_thumbnail: "",
      additional_product_thumbnail: [],
    };
    //
    try {
      const updatableProduct = await Product.findById(idUpdatableProduct);

      if (updatableProduct) {
        console.log("----- !!");
        const valid = isPatchBodyValid({
          updatable: updatableProduct,
          role: req.role,
          bodyData: req.body,
        });

        let len = fieldsMap[operableEntities.product].length;
        //
        for (let i = 0; i < len; i++) {
          let fieldName = fieldsMap[operableEntities.product][i].name;
          let maxCount = fieldsMap[operableEntities.product][i].maxCount;
          if (req?.files?.[fieldName]) {
            if (maxCount === 1) {
              paths[fieldName] = await uploadHandler({
                what: fieldName,
                file: req.files[fieldName][0],
              });
              removeFile({ fileUrl: updatableProduct[fieldName] });
            }
            if (maxCount > 1) {
              console.log("maxC > 1");
              for (let i = 0; i < req?.files?.[fieldName].length; i++) {
                let fileUrl = await uploadHandler({
                  what: fieldName,
                  file: req.files[fieldName][i],
                });
                paths[fieldName][i] = fileUrl;
              }
              for (let i = 0; i < updatableProduct[fieldName]?.length; i++) {
                removeFile({ fileUrl: updatableProduct[fieldName][i] });
              }
            }
          }
        }

        const editResult = await Product.findByIdAndUpdate(
          idUpdatableProduct,
          {
            ...valid,
            product_thumbnail: paths["product_thumbnail"]
              ? paths["product_thumbnail"]
              : updatableProduct.product_thumbnail,
            additional_product_thumbnail: paths["additional_product_thumbnail"]
              ? paths["additional_product_thumbnail"]
              : updatableProduct.additional_product_thumbnail,
          },
          { new: true }
        );
        sendUpdateResponse({
          res,
          what: operableEntities.product,
          data: editResult,
        });
      } else {
        res.status(404).send({
          success: false,
          status: 404,
          message: "Id not found",
        });
      }
    } catch (error) {
      console.log("error cash ... ");
      if (req.file.path) {
        await unlinkAsync(req.file.path);
      }
      sendErrorResponse({ res, error, what: operableEntities.ad });
    }
  } catch (error) {
    console.log("error cash ... 2");
    sendErrorResponse({ res, error, what: operableEntities.ad });
  }
}

async function getProducts(req, res) {
  const result = await productService.getProducts(req.query);
  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.product });
  } else {
    sendFetchResponse({ res, data: result, what: operableEntities.product });
  }
}
//
async function deleteProduct(req, res) {
  const result = await productService.deleteProduct(req.params.id);
  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.product });
  } else {
    sendDeletionResponse({ res, data: result, what: operableEntities.product });
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
      console.log(
        JSON.stringify(existingProduct) +
          "   found -------------------------------------" +
          is_active +
          " " +
          typeof is_active
      );
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
          what: operableEntities.product,
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
          what: operableEntities.product,
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
module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  updateApprovalByAdmin,
  updateStatusBySeller,
};
