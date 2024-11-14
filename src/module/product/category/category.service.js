/* eslint-disable no-unused-vars */
const { entities } = require("../../../config/constants");
const Category = require("./category.model");
const { getSearchAndPagination } = require("../../../utils/pagination");

//

async function getSingleCategory(updatableId) {
  try {
    const getResult = await Category.findById(updatableId);
    return getResult;
  } catch (error) {
    return error;
  }
}

async function getCategories(query) {
  try {
    const {
      current_page,
      view_limit,
      view_skip,
      sort_by,
      sort_order,
      filter_conditions,
      sort_conditions,
    } = getSearchAndPagination({ query, entity: entities.address });

    if (query?.["is_active"]) {
      filter_conditions["is_active"] = query?.["is_active"];
    }

    const fetchResult = await Category.find(filter_conditions)
      .sort(sort_conditions)
      .skip(view_skip)
      .limit(view_limit);

    const total = await Category.countDocuments(filter_conditions);
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
    console.log("error: service: " + error.message);
    return error;
  }
}
//
async function deleteCategory(id) {
  try {
    const deleteResult = await Category.findByIdAndDelete(id);
    return deleteResult;
  } catch (error) {
    return error;
  }
}

module.exports = {
  deleteCategory,
  getCategories,
  getSingleCategory,
};
