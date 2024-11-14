/* eslint-disable no-unused-vars */
const { entities } = require("../../../config/constants");
const Unit = require("./unit.model");
const { getSearchAndPagination } = require("../../../utils/pagination");
//
async function createUnit(data) {
  try {
    const addResult = await Unit.create(data);
    return addResult;
  } catch (error) {
    return error;
  }
}
//
async function getSingleUnit(id) {
  try {
    const fetchResult = await Unit.findById(id);
    return fetchResult;
  } catch (error) {
    return error;
  }
}
//
async function updateUnit({ id, data }) {
  try {
    const updateResult = await Unit.findByIdAndUpdate(id, data, {
      new: true,
    });
    return updateResult;
  } catch (error) {
    return error;
  }
}

//
async function getUnits(query) {
  try {
    const {
      current_page,
      view_limit,
      view_skip,
      sort_by,
      sort_order,
      filter_conditions,
      sort_conditions,
    } = getSearchAndPagination({ query, entity: entities.unit });

    filterData = query?.["is_active"];
    if (filterData === true || filterData === false) {
      filter_conditions["is_active"] = filterData;
    }

    const fetchResult = await Unit.find(filter_conditions)
      .sort(sort_conditions)
      .skip(view_skip)
      .limit(view_limit);

    const total = await Unit.countDocuments(filter_conditions);
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
async function deleteUnit(id) {
  try {
    const deleteResult = await Unit.findByIdAndDelete(id);
    return deleteResult;
  } catch (error) {
    return error;
  }
}

module.exports = {
  deleteUnit,
  getUnits,
  createUnit,
  updateUnit,
  getSingleUnit,
};
