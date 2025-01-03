 
const { entities } = require("../../../config/constants");
const Coupon = require("./coupon.model");
const { getSearchAndPagination } = require("../../../utils/pagination");
//
async function createCoupon(data) {
  try {
    const addResult = await Coupon.create(data);
    return addResult;
  } catch (error) {
    return error;
  }
}
//
async function getCoupons(query) {
  try {
    const {
      current_page,
      view_limit,
      view_skip,
      sort_by,
      sort_order,
      filter_conditions,
      sort_conditions,
    } = getSearchAndPagination({ query, entity: entities.coupon });

    console.log("filter_conditions:  " + JSON.stringify(filter_conditions));

    const fetchResult = await Coupon.find(filter_conditions)
      .sort(sort_conditions)
      .skip(view_skip)
      .limit(view_limit)
      .populate("shop");

    const total = await Coupon.countDocuments(filter_conditions);
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
    console.log("err: " + error.message);
    return error;
  }
}
//
async function updateCoupon({ id, data }) {
  try {
    const editResult = await Coupon.findByIdAndUpdate(id, data, {
      new: true,
    });
    return editResult;
  } catch (error) {
    return error;
  }
}
//
async function deleteCoupon(id) {
  try {
    const deleteResult = await Coupon.findByIdAndDelete(id);
    return deleteResult;
  } catch (error) {
    return error;
  }
}

module.exports = {
  createCoupon,
  updateCoupon,
  deleteCoupon,
  getCoupons,
};
