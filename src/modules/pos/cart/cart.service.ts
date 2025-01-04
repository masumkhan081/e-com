 
import { entities } from "../../../config/constants";
import Cart from "./cart.model";
import Order from "../order/order.model";
import { getSearchAndPagination } from "../../../utils/pagination";
//
async function createOrderFromCart(data) {}
//
async function createCart(data) {
  try {
    const cart = await Cart.create(data);
    return cart;
  } catch (error) {
    // console.log("service : create :  " + error.message);
    return error;
  }
}
//
async function getCarts(query) {
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

    const fetchResult = await Cart.find(filter_conditions)
      .sort(sort_conditions)
      .skip(view_skip)
      .limit(view_limit);

    const total = await Cart.countDocuments(filter_conditions);
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
    console.log("service : get :  " + error.message);
    return error;
  }
}
//
async function updateCart({ id, data }) {
  try {
    const editResult = await Cart.findByIdAndUpdate(id, data, {
      new: true,
    });
    return editResult;
  } catch (error) {
    console.log("service : update :  " + error.message);
    return error;
  }
}
//
async function deleteCart(id) {
  try {
    const deleteResult = await Cart.findByIdAndDelete(id);
    return deleteResult;
  } catch (error) {
    return error;
  }
}

export default {
  createOrderFromCart,
  createCart,
  updateCart,
  deleteCart,
  getCarts,
};
