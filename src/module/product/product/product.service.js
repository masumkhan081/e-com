/* eslint-disable no-unused-vars */
const { operableEntities } = require("../../../config/constants");
const Product = require("./product.model");
const { getSearchAndPagination } = require("../../../utils/pagination");

async function createProduct(data) {
  try {
    const addResult = await Product.create(data);
    return addResult;
  } catch (error) {
    return error;
  }
}
//
async function getProducts(query) {
  try {
    const {
      currentPage,
      viewLimit,
      viewSkip,
      sortBy,
      sortOrder,
      filterConditions,
      sortConditions,
    } = getSearchAndPagination({ query, what: operableEntities.product });

    filterData = query?.["is_active"];
    if (filterData === true || filterData === false) {
      filterConditions["is_active"] = filterData;
    }

    const fetchResult = await Product.find(filterConditions)
      .sort(sortConditions)
      .skip(viewSkip)
      .limit(viewLimit)
      .populate("brand") // Populate brand
      .populate("color") // Populate color
      .populate("category")
      .populate("sub_category")
      .populate("size"); // Populate category

    const total = await Product.countDocuments(filterConditions);
    return {
      meta: {
        total,
        limit: viewLimit,
        page: currentPage,
        skip: viewSkip,
        sortBy,
        sortOrder,
      },
      data: fetchResult,
    };
  } catch (error) {
    return error;
  }
}
//
async function updateProduct({ id, data }) {
  try {
    const editResult = await Product.findByIdAndUpdate(id, data, {
      new: true,
    });
    return editResult;
  } catch (error) {
    return error;
  }
}
//
async function deleteProduct(id) {
  try {
    const deleteResult = await Product.findByIdAndDelete(id);
    return deleteResult;
  } catch (error) {
    return error;
  }
}

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
};
