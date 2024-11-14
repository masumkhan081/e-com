/* eslint-disable no-unused-vars */
const { entities } = require("../../../config/constants");
const Order = require("./order.model");
const { getSearchAndPagination } = require("../../../utils/pagination");

//
async function getOrders(query) {
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

    const fetchResult = await Order.find(filter_conditions)
      .sort(sort_conditions)
      .skip(view_skip)
      .limit(view_limit);

    const total = await Order.countDocuments(filter_conditions);
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
async function deleteOrder(id) {
  try {
    const deleteResult = await Order.findByIdAndDelete(id);
    return deleteResult;
  } catch (error) {
    return error;
  }
}

module.exports = {
   
  deleteOrder,
  getOrders,
};
