 
const { entities } = require("../../../config/constants");
const Ad = require("./ad.model");
const { getSearchAndPagination } = require("../../../utils/pagination");

//

async function getSingleAd(updatableId) {
  try {
    const getResult = await Ad.findById(updatableId);
    return getResult;
  } catch (error) {
    return error;
  }
}

async function getAds(query) {
  try {
    const {
      current_page,
      view_limit,
      view_skip,
      sort_by,
      sort_order,
      filter_conditions,
      sort_conditions,
    } = getSearchAndPagination({ query, entity: entities.ad });

    // filter_conditions.is_active = true;

    const fetchResult = await Ad.find(filter_conditions)
      .sort(sort_conditions)
      .skip(view_skip)
      .limit(view_limit);

    const total = await Ad.countDocuments(filter_conditions);
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
async function deleteAd(id) {
  try {
    const deleteResult = await Ad.findByIdAndDelete(id);
    return deleteResult;
  } catch (error) {
    return error;
  }
}

module.exports = {
  deleteAd,
  getAds,
  getSingleAd,
};
