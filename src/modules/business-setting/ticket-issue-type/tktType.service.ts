 
import { entities } from "../../../config/constants";
import TktType from "./tktType.model";
import { getSearchAndPagination } from "../../../utils/pagination";

async function createTktType(data) {
  try {
    const addResult = await TktType.create(data);
    return addResult;
  } catch (error) {
    return error;
  }
}
//
async function updateTktType({ id, data }) {
  try {
    const editResult = await TktType.findByIdAndUpdate(id, data, {
      new: true,
    });
    return editResult;
  } catch (error) {
    return error;
  }
}
//
async function deleteTktType(id) {
  try {
    const deleteResult = await TktType.findByIdAndDelete(id);
    return deleteResult;
  } catch (error) {
    return error;
  }
}

async function getTktTypes(query) {
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
      entity: entities.ticket_type,
    });

    const fetchResult = await TktType.find(filter_conditions)
      .sort(sort_conditions)
      .skip(view_skip)
      .limit(view_limit);

    const total = await TktType.countDocuments(filter_conditions);
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
  createTktType,
  updateTktType,
  deleteTktType,
  getTktTypes,
};
