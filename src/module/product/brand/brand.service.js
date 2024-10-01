/* eslint-disable no-unused-vars */
const { operableEntities } = require("../../../config/constants");
const Brand = require("./brand.model");
const { getSearchAndPagination } = require("../../../utils/pagination");
//
async function createBrand(data) {
  try {
    const addResult = await Brand.create({ name: data.name });
    return addResult;
  } catch (error) {
    console.log("err-2");
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
async function getBrands(query) {
  try {
    const {
      currentPage,
      viewLimit,
      viewSkip,
      sortBy,
      sortOrder,
      filterConditions,
      sortConditions,
    } = getSearchAndPagination({ query, what: operableEntities.brand });

    filterData = query?.["is_active"];
    if (filterData === true || filterData === false) {
      filterConditions["is_active"] = filterData;
    }

    const fetchResult = await Brand.find(filterConditions)
      .sort(sortConditions)
      .skip(viewSkip)
      .limit(viewLimit);

    const total = await Brand.countDocuments(filterConditions);
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
async function deleteBrand(id) {
  try {
    const deleteResult = await Brand.findByIdAndDelete(id);
    return deleteResult;
  } catch (error) {
    return error;
  }
}
//
module.exports = {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrands,
};
