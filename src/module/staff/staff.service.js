/* eslint-disable no-unused-vars */
const { entities } = require("../config/constants");
const Staff = require("../models/staff.model");
const { getSearchAndPagination } = require("../utils/pagination");

async function createStaff(data) {
  try {
    const addResult = await Staff.create(data);
    return addResult;
  } catch (error) {
    return error;
  }
}
//
async function getStaff(query) {
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

    const fetchResult = await Staff.find(filter_conditions)
      .sort(sort_conditions)
      .skip(view_skip)
      .limit(view_limit);

    const total = await Staff.countDocuments(filter_conditions);
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
async function updateStaff({ id, data }) {
  try {
    const editResult = await Staff.findByIdAndUpdate(id, data, {
      new: true,
    });
    return editResult;
  } catch (error) {
    return error;
  }
}
//
async function deleteStaff(id) {
  try {
    const deleteResult = await Staff.findByIdAndDelete(id);
    return deleteResult;
  } catch (error) {
    return error;
  }
}

module.exports = {
  createStaff,
  updateStaff,
  deleteStaff,
  getStaff,
};
