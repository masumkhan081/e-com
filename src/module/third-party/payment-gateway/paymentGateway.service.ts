 
const { entities } = require("../../../config/constants");
const { PaymentConfig } = require("./paymentGateway.model");
const { getSearchAndPagination } = require("../../../utils/pagination");
//
async function createPaymentGateway(data) {
  try {
    const addResult = await PaymentConfig.create(data);
    return addResult;
  } catch (error) {
    return error;
  }
}
//
async function getPaymentGateway(query) {
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
      entity: entities.payment_gateway,
    });

    console.log("before db call ..");

    const fetchResult = await PaymentConfig.find(filter_conditions)
      .sort(sort_conditions)
      .skip(view_skip)
      .limit(view_limit);
    console.log("after db call ..");

    const total = await PaymentConfig.countDocuments(filter_conditions);
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
async function updatePaymentGateway({ id, data }) {
  try {
    const editResult = await PaymentConfig.findByIdAndUpdate(id, data, {
      new: true,
    });
    return editResult;
  } catch (error) {
    return error;
  }
}
//
async function deletePaymentGateway(id) {
  try {
    const deleteResult = await PaymentConfig.findByIdAndDelete(id);
    return deleteResult;
  } catch (error) {
    return error;
  }
}

module.exports = {
  createPaymentGateway,
  updatePaymentGateway,
  deletePaymentGateway,
  getPaymentGateway,
};
