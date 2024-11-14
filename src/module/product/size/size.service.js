/* eslint-disable no-unused-vars */
const { entities } = require("../../../config/constants");
const Size = require("./size.model");
const { getSearchAndPagination } = require("../../../utils/pagination");
//
async function createSize(data) {
  try {
    const addResult = await Size.create(data);
    return addResult;
  } catch (error) {
    return error;
  }
}
//
async function updateSize({ id, data }) {
  try {
    const updateResult = await Size.findByIdAndUpdate(id, data, {
      new: true,
    });
    return updateResult;
  } catch (error) {
    return error;
  }
}
//
async function getSingleSize(id) {
  try {
    const fetchResult = await Size.findById(id);
    return fetchResult;
  } catch (error) {
    return error;
  }
}
//
async function updateSizeStatus({ id, is_active }) {
  try {
    const updateResult = await Size.findByIdAndUpdate(
      id,
      { is_active },
      {
        new: true,
      }
    );
    return updateResult;
  } catch (error) {
    return error;
  }
}
//
async function getSizes(query) {
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

    filterData = query?.["is_active"];
    if (filterData === true || filterData === false) {
      filter_conditions["is_active"] = filterData;
    }

    const fetchResult = await Size.find(filter_conditions)
      .sort(sort_conditions)
      .skip(view_skip)
      .limit(view_limit);

    const total = await Size.countDocuments(filter_conditions);
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
async function deleteSize(id) {
  try {
    const deleteResult = await Size.findByIdAndDelete(id);
    return deleteResult;
  } catch (error) {
    return error;
  }
}
//
module.exports = {
  createSize,
  updateSize,
  deleteSize,
  getSizes,
  getSingleSize,
  updateSizeStatus,
};
