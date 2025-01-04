 
import { entities } from "../config/constants";
import Support from "../models/support.model";
import { getSearchAndPagination } from "../utils/pagination";

async function createSupport(data) {
  try {
    const addResult = await Support.create(data);
    return addResult;
  } catch (error) {
    return error;
  }
}
//
async function getSupports(query) {
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

    const fetchResult = await Support.find(filter_conditions)
      .sort(sort_conditions)
      .skip(view_skip)
      .limit(view_limit);

    const total = await Support.countDocuments(filter_conditions);
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
async function updateSupport({ id, data }) {
  try {
    const editResult = await Support.findByIdAndUpdate(id, data, {
      new: true,
    });
    return editResult;
  } catch (error) {
    return error;
  }
}
//
async function deleteSupport(id) {
  try {
    const deleteResult = await Support.findByIdAndDelete(id);
    return deleteResult;
  } catch (error) {
    return error;
  }
}

export default {
  createSupport,
  updateSupport,
  deleteSupport,
  getSupports,
};
