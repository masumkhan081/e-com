 
import { entities } from "../../../config/constants";
import Shop from "./shop.model";
import { getSearchAndPagination } from "../../../utils/pagination";
import { mongoose } from "mongoose";
//
async function getShops(query) {
  try {
    const {
      current_page,
      view_limit,
      view_skip,
      sort_by,
      sort_order,
      filter_conditions,
      sort_conditions,
    } = getSearchAndPagination({ query, entity: entities.shop });

    console.log("\n\n" + JSON.stringify(sort_conditions) + "\n\n");

    const fetchResult = await Shop.aggregate([
      { $match: filter_conditions }, // Match shops based on filter conditions
      {
        $lookup: {
          from: "orders", // Name of the orders collection
          localField: "_id", // Shop's ObjectId
          foreignField: "shop", // Orders reference the shop by 'shop'
          as: "orders",
        },
      },
      {
        $lookup: {
          from: "products", // Name of the products collection
          localField: "_id", // Shop's ObjectId
          foreignField: "shop", // Products reference the shop by 'shop'
          as: "products",
        },
      },
      {
        $addFields: {
          order_count: { $size: "$orders" }, // Count of orders
          product_count: { $size: "$products" }, // Count of products
        },
      },
      {
        $project: {
          orders: 0, // Exclude the orders array if not needed
          products: 0, // Exclude the products array if not needed
        },
      },
      { $sort: sort_conditions },
      { $skip: view_skip },
      { $limit: view_limit },
    ]);

    const total = await Shop.countDocuments(filter_conditions);
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
async function getSingleShop(id) {
  try {
    const fetchResult = await Shop.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } }, // Match the shop by ID
      {
        $lookup: {
          from: "orders", // Orders collection
          localField: "_id", // Shop's ObjectId
          foreignField: "shop", // Orders reference the shop by 'shop'
          as: "orders",
        },
      },
      {
        $lookup: {
          from: "products", // Products collection
          localField: "_id", // Shop's ObjectId
          foreignField: "shop", // Products reference the shop by 'shop'
          as: "products",
        },
      },
      {
        $addFields: {
          order_count: { $size: "$orders" }, // Count of orders
          product_count: { $size: "$products" }, // Count of products
        },
      },
      {
        $project: {
          orders: 0, // Exclude orders array if not needed
          products: 0, // Exclude products array if not needed
        },
      },
    ]);
    return fetchResult;
  } catch (error) {
    console.log("err: getSingleShop: " + error.message);
    return error;
  }
}
//
async function deleteShop(id) {
  try {
    const deleteResult = await Shop.findByIdAndDelete(id);
    return deleteResult;
  } catch (error) {
    return error;
  }
}

export default {
  deleteShop,
  getShops,
  getSingleShop,
};
