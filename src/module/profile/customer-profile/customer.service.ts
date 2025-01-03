 
const { entities } = require("../../../config/constants");
const Customer = require("./customer.model");
const { getSearchAndPagination } = require("../../../utils/pagination");
const {
  updateContactUs,
} = require("../../legal-pages/contact-us/contactUs.controller");
//
async function createCustomer(data) {
  try {
    const addResult = await Customer.create(data);
    return addResult;
  } catch (error) {
    return error;
  }
}
//
async function getCustomers(query) {
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

    const fetchResult = await Customer.find(filter_conditions)
      .sort(sort_conditions)
      .skip(view_skip)
      .limit(view_limit);

    const total = await Customer.countDocuments(filter_conditions);
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
async function updateCustomer({ id, data }) {
  try {
    const editResult = await Customer.findByIdAndUpdate(id, data, {
      new: true,
    });
    return editResult;
  } catch (error) {
    return error;
  }
}
//
async function deleteCustomer(id) {
  try {
    const deleteResult = await Customer.findByIdAndDelete(id);
    return deleteResult;
  } catch (error) {
    return error;
  }
}
//
module.exports = {
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomers,
};
