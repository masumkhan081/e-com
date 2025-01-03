 
const { entities } = require("../../../config/constants");
const ThemeColor = require("./themeColor.model");
const { getSearchAndPagination } = require("../../../utils/pagination");

async function createThemeColor(data) {
  try {
    const addResult = await ThemeColor.create(data);
    return addResult;
  } catch (error) {
    return error;
  }
}
//
async function updateThemeColor({ id, data }) {
  try {
    const editResult = await ThemeColor.findByIdAndUpdate(id, data, {
      new: true,
    });
    return editResult;
  } catch (error) {
    return error;
  }
}
//
async function deleteThemeColor(id) {
  try {
    const deleteResult = await ThemeColor.findByIdAndDelete(id);
    return deleteResult;
  } catch (error) {
    return error;
  }
}

async function getThemeColors(query) {
  try {
    const {
      current_page,
      view_limit,
      view_skip,
      sort_by,
      sort_order,
      filter_conditions,
      sort_conditions,
    } = getSearchAndPagination({ query, entity: entities.theme_color });

    const fetchResult = await ThemeColor.find(filter_conditions)
      .sort(sort_conditions)
      .skip(view_skip)
      .limit(view_limit);

    const total = await ThemeColor.countDocuments(filter_conditions);
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

module.exports = {
  createThemeColor,
  updateThemeColor,
  deleteThemeColor,
  getThemeColors,
};
