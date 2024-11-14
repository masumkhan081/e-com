/* eslint-disable no-unused-vars */
const { entities } = require("../../../config/constants");
const Brand = require("./brand.model");
const { getSearchAndPagination } = require("../../../utils/pagination");
//
async function createBrand({ name, logo }) {
  try {
    const addResult = await Brand.create({ name, logo });
    return addResult;
  } catch (error) {
    console.log("err: service: createBrand");
    return error;
  }
}

//
async function updateBrand({ id, data }) {
  try {
    const updateResult = await Brand.findByIdAndUpdate(id, data, {
      new: true,
    });
    return updateResult;
  } catch (error) {
    return error;
  }
}
//
async function getSingleBrand(id) {
  try {
    const fetchResult = await Brand.findById(id);
    return fetchResult;
  } catch (error) {
    return error;
  }
}

//
async function getBrands(query) {
  try {
    const {
      current_page,
      view_limit,
      view_skip,
      sort_by,
      sort_order,
      filter_conditions,
      sort_conditions,
    } = getSearchAndPagination({ query, entity: entities.brand });

    const fetchResult = await Brand.find(filter_conditions)
      .sort(sort_conditions)
      .skip(view_skip)
      .limit(view_limit);

    const total = await Brand.countDocuments(filter_conditions);
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
async function deleteBrand(id) {
  try {
    const deleteResult = await Brand.findByIdAndDelete(id);
    return deleteResult;
  } catch (error) {
    console.log("error.message:  " + error.message);
    return error;
  }
}
//
module.exports = {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrands,
  getSingleBrand, 
};
