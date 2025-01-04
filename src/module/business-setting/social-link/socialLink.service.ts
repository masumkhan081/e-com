 
import { entities } from "../../../config/constants";
import SocialLink from "./socialLink.model";
import { getSearchAndPagination } from "../../../utils/pagination";

async function createSocialLink(data) {
  try {
    const addResult = await SocialLink.create(data);
    return addResult;
  } catch (error) {
    return error;
  }
}
//
async function updateSocialLink({ id, data }) {
  try {
    const editResult = await SocialLink.findByIdAndUpdate(id, data, {
      new: true,
    });
    return editResult;
  } catch (error) {
    return error;
  }
}
//
async function deleteSocialLink(id) {
  try {
    const deleteResult = await SocialLink.findByIdAndDelete(id);
    return deleteResult;
  } catch (error) {
    return error;
  }
}

async function getSocialLinks(query) {
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

    const fetchResult = await SocialLink.find(filter_conditions)
      .sort(sort_conditions)
      .skip(view_skip)
      .limit(view_limit);

    const total = await SocialLink.countDocuments(filter_conditions);
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
  createSocialLink,
  updateSocialLink,
  deleteSocialLink,
  getSocialLinks,
};
