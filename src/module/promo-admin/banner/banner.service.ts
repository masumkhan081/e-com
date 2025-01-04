 
import { entities } from "../../../config/constants";
import Banner from "./banner.model";
import { getSearchAndPagination } from "../../../utils/pagination";

async function getSingleBanner(updatableId) {
  try {
    const getResult = await Banner.findById(updatableId);
    return getResult;
  } catch (error) {
    return error;
  }
}

async function createBanner(data) {
  try {
    const addResult = await Banner.create(data);
    return addResult;
  } catch (error) {
    return error;
  }
}
//
async function getBanners(query) {
  try {
    const {
      current_page,
      view_limit,
      view_skip,
      sort_by,
      sort_order,
      filter_conditions,
      sort_conditions,
    } = getSearchAndPagination({ query, entity: entities.banner });

    // filter_conditions.is_active = true;

    const fetchResult = await Banner.find(filter_conditions)
      .sort(sort_conditions)
      .skip(view_skip)
      .limit(view_limit);

    const total = await Banner.countDocuments(filter_conditions);
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
async function updateBanner({ id, data }) {
  try {
    const editResult = await Banner.findByIdAndUpdate(id, data, {
      new: true,
    });
    return editResult;
  } catch (error) {
    return error;
  }
}
//
async function deleteBanner(id) {
  try {
    const deleteResult = await Banner.findByIdAndDelete(id);
    return deleteResult;
  } catch (error) {
    return error;
  }
}

export default {
  createBanner,
  updateBanner,
  deleteBanner,
  getBanners,
  getSingleBanner,
};
