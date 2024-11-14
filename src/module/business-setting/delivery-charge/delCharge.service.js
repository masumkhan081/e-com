/* eslint-disable no-unused-vars */
const { entities } = require("../../../config/constants");
const DeliveryCharge = require("./delCharge.model");
const { getSearchAndPagination } = require("../../../utils/pagination");

async function createDeliveryCharge(data) {
  try {
    const addResult = await DeliveryCharge.createDeliveryCharge(data);
    return addResult;
  } catch (error) {
    return error;
  }
}
//
async function getDeliveryCharges(query) {
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
      entity: entities.delivery_charge,
    });

    const fetchResult = await DeliveryCharge.find(filter_conditions)
      .sort(sort_conditions)
      .skip(view_skip)
      .limit(view_limit);

    const total = await DeliveryCharge.countDocuments(filter_conditions);
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
async function updateDeliveryCharge({ id, data }) {
  try {
    const editResult = await DeliveryCharge.findByIdAndUpdate(id, data, {
      new: true,
    });
    return editResult;
  } catch (error) {
    return error;
  }
}
//
async function deleteDeliveryCharge(id) {
  try {
    const deleteResult = await DeliveryCharge.findByIdAndDelete(id);
    return deleteResult;
  } catch (error) {
    return error;
  }
}

module.exports = {
  createDeliveryCharge,
  updateDeliveryCharge,
  deleteDeliveryCharge,
  getDeliveryCharges,
};
