/* eslint-disable no-unused-vars */
const { entities } = require("../../../config/constants");
const TermCondition = require("./termCondition.model");
const { getSearchAndPagination } = require("../../../utils/pagination");
//
const updateTermCondition = async (data) =>
  await TermCondition.findOneAndUpdate(
    {},
    { $set: data },
    { new: true, upsert: true }
  );
//
const getTermCondition = async () => TermCondition.find({});

//
module.exports = {
  updateTermCondition,
  getTermCondition,
};
