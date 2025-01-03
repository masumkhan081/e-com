 
const { entities } = require("../../../config/constants");
const {SMSConfig} = require("./smsGateway.model");
const { getSearchAndPagination } = require("../../../utils/pagination");
//
async function createSMSConfig(data) {
  try {
    const addResult = await SMSConfig.create(data);
    return addResult;
  } catch (error) {
    return error;
  }
}
//
async function getSMSConfig(query) {
  try {
    const {
      current_page,
      view_limit,
      view_skip,
      sort_by,
      sort_order,
      filter_conditions,
      sort_conditions,
    } = getSearchAndPagination({ query, entity: entities.sms_gateway });

    const fetchResult = await SMSConfig.find(filter_conditions)
      .sort(sort_conditions)
      .skip(view_skip)
      .limit(view_limit);

    const total = await SMSConfig.countDocuments(filter_conditions);
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
async function updateSMSConfig({ id, data }) {
  try {
    const editResult = await SMSConfig.findByIdAndUpdate(id, data, {
      new: true,
    });
    return editResult;
  } catch (error) {
    return error;
  }
}
//
const deleteSMSConfig = async (id) => await SMSConfig.findByIdAndDelete(id);

module.exports = {
  createSMSConfig,
  updateSMSConfig,
  deleteSMSConfig,
  getSMSConfig,
};
