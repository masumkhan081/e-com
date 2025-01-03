 
const { entities } = require("../../../config/constants");
const Rider = require("./rider.model");
const { getSearchAndPagination } = require("../../../utils/pagination");
const { removeFile } = require("../../../utils/fileHandle"); 

//

async function getSingleRider(updatableId) {
  try {
    const getResult = await Rider.findById(updatableId);
    return getResult;
  } catch (error) {
    return error;
  }
}

async function createRider(data) {
  try {
    const addResult = await Rider.create(data);
    return addResult;
  } catch (error) {
    return error;
  }
}
//
async function getRiders(query) {
  try {
    const {
      current_page,
      view_limit,
      view_skip,
      sort_by,
      sort_order,
      filter_conditions,
      sort_conditions,
    } = getSearchAndPagination({ query, entity: entities.rider });

    const fetchResult = await Rider.find(filter_conditions)
      .sort(sort_conditions)
      .skip(view_skip)
      .limit(view_limit);

    const total = await Rider.countDocuments(filter_conditions);
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
async function updateRider({ id, data }) {
  try {
    const editResult = await Rider.findByIdAndUpdate(id, data, {
      new: true,
    });
    return editResult;
  } catch (error) {
    return error;
  }
}
//
async function deleteRider(id) {
  try {
    const deleteResult = await Rider.findByIdAndDelete(id);
    console.log("deleteResult:  " + JSON.stringify(deleteResult));
    removeFile({ fileUrl: deleteResult?.rider_profile });
    return deleteResult;
  } catch (error) {
    return error;
  }
}

module.exports = {
  createRider,
  updateRider,
  deleteRider,
  getRiders,
  getSingleRider
};
