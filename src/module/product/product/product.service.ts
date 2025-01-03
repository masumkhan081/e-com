 
const { entities } = require("../../../config/constants");
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

async function getSingleProduct(id) {
  try {
    const fetchResult = await Product.findById(id)
      .populate("brand")
      .populate("category")
      .populate("sub_category")
      .populate("unit");
    return fetchResult;
  } catch (error) {
    return error;
  }
}

async function getProducts(query) {
  try {
    const {
      current_page,
      view_limit,
      view_skip,
      sort_by,
      sort_order,
      filter_conditions,
      sort_conditions,
    } = getSearchAndPagination({ query, entity: entities.product });

    let sub_categories;

    if (query?.["sub_category"]) {
      sub_categories = query["sub_category"].split(",");
      filter_conditions["sub_category"] = { $in: sub_categories };
    }

    if (query?.["is_active"]) {
      filter_conditions["is_active"] = query?.["is_active"];
    }
    if (query?.["color"]) {
      filter_conditions["variants"] = {
        $elemMatch: { color: query["color"] },
      };
    }

    // if (query?.["brand"]) {
    //   filter_conditions["is_active"] = query?.["is_active"];
    // }

    const fetchResult = await Product.find(filter_conditions)
      .sort(sort_conditions)
      .skip(view_skip)
      .limit(view_limit)
      .populate("brand")
      .populate("category")
      .populate("sub_category")
      .populate("unit");

    //

    //

    const total = await Product.countDocuments(filter_conditions);
    return {
      meta: {
        total,
        limit: view_limit,
        page: current_page,
        skip: view_skip,
        sort_by,
        sort_order,
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
  getSingleProduct,
};
