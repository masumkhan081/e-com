 
import { entities } from "../../../config/constants";
import SubCategory from "./subCategory.model";
import { getSearchAndPagination } from "../../../utils/pagination";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";

//
async function getSingleSubCategory(updatableId) {
  try {
    const getResult = await SubCategory.findById(updatableId).populate(
      "category"
    );
    return getResult;
  } catch (error) {
    return error;
  }
}

async function getSubCategories(query) {
  try {
    const {
      current_page,
      view_limit,
      view_skip,
      sort_by,
      sort_order,
      filter_conditions,
      sort_conditions,
    } = getSearchAndPagination({ query, entity: entities.sub_category });

    if (query?.["is_active"]) {
      filter_conditions["is_active"] = query?.["is_active"];
    }
    if (query?.["category"]) {
      try {
        filter_conditions["category"] = query?.["category"];
      } catch (error) {
        console.log("err:  cating error");
      }
    }

    const fetchResult = await SubCategory.find(filter_conditions)
      .sort(sort_conditions)
      .skip(view_skip)
      .limit(view_limit)
      .populate("category");

    const total = await SubCategory.countDocuments(filter_conditions);
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
async function deleteSubCategory(id) {
  try {
    const deleteResult = await SubCategory.findByIdAndDelete(id);
    return deleteResult;
  } catch (error) {
    return error;
  }
}

export default {
  deleteSubCategory,
  getSubCategories,
  getSingleSubCategory,
};
