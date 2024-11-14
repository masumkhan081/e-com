/* eslint-disable no-unused-vars */
const { entities } = require("../../../config/constants");
const Profile = require("./profile.model");
const { getSearchAndPagination } = require("../../../utils/pagination");

async function createProfile(data) {
  try {
    const addResult = await Profile.create(data);
    return addResult;
  } catch (error) {
    return error;
  }
}
//
async function getProfiles(query) {
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

    const fetchResult = await Profile.find(filter_conditions)
      .sort(sort_conditions)
      .skip(view_skip)
      .limit(view_limit);

    const total = await Profile.countDocuments(filter_conditions);
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
async function updateProfile({ id, data }) {
  try {
    const editResult = await Profile.findByIdAndUpdate(id, data, {
      new: true,
    });
    return editResult;
  } catch (error) {
    return error;
  }
}
//
async function deleteProfile(id) {
  try {
    const deleteResult = await Profile.findByIdAndDelete(id);
    return deleteResult;
  } catch (error) {
    return error;
  }
}

module.exports = {
  createProfile,
  updateProfile,
  deleteProfile,
  getProfiles,
};
