 
const { entities } = require("../../../config/constants");
const Color = require("./color.model");
const { getSearchAndPagination } = require("../../../utils/pagination");
// 
//
async function getSingleColor(id) {
  try {
    const fetchResult = await Color.findById(id);
    return fetchResult;
  } catch (error) {
    return error;
  }
}

async function createColor(data) {
  try {
    const addResult = await Color.create(data);
    return addResult;
  } catch (error) {
    return error;
  }
}
//
async function getColors(query) {
  try {
    const {
      current_page,
      view_limit,
      view_skip,
      sort_by,
      sort_order,
      filter_conditions,
      sort_conditions,
    } = getSearchAndPagination({ query, entity: entities.color });

    filterData = query?.["is_active"];
    if (filterData === true || filterData === false) {
      filter_conditions["is_active"] = filterData;
    }
    //

    const fetchResult = await Color.find(filter_conditions)
      .sort(sort_conditions)
      .skip(view_skip)
      .limit(view_limit);

    const total = await Color.countDocuments(filter_conditions);
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
async function updateColor({ id, data }) {
  try {
    const editResult = await Color.findByIdAndUpdate(id, data, {
      new: true,
    });
    return editResult;
  } catch (error) {
    return error;
  }
}
//
async function deleteColor(id) {
  try {
    const deleteResult = await Color.findByIdAndDelete(id);
    return deleteResult;
  } catch (error) {
    return error;
  }
}

module.exports = {
  createColor,
  updateColor,
  deleteColor,
  getColors,
  getSingleColor
};
