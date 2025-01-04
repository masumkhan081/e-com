 
import { entities } from "../../../config/constants";
import QuickLink from "./quickLink.model";
import { getSearchAndPagination } from "../../../utils/pagination";

async function createQuickLink(data) {
  try {
    const addResult = await QuickLink.create(data);
    return addResult;
  } catch (error) {
    return error;
  }
}
//
async function updateQuickLink({ id, data }) {
  try {
    const editResult = await QuickLink.findByIdAndUpdate(id, data, {
      new: true,
    });
    return editResult;
  } catch (error) {
    return error;
  }
}
//
async function deleteQuickLink(id) {
  try {
    const deleteResult = await QuickLink.findByIdAndDelete(id);
    return deleteResult;
  } catch (error) {
    return error;
  }
}

async function getQuickLinks(query) {
  try {
    const {
      current_page,
      view_limit,
      view_skip,
      sort_by,
      sort_order,
      filter_conditions,
      sort_conditions,
    } = getSearchAndPagination({
      query,
      entity: entities.q,
    });

    const fetchResult = await QuickLink.find(filter_conditions)
      .sort(sort_conditions)
      .skip(view_skip)
      .limit(view_limit);

    const total = await QuickLink.countDocuments(filter_conditions);
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

export default {
  createQuickLink,
  updateQuickLink,
  deleteQuickLink,
  getQuickLinks,
};
