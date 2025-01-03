 

const ReturnRefund = require("./returnRefund.model");

//
const updateReturnRefund = async (data) =>
  await ReturnRefund.findOneAndUpdate(
    {},
    { $set: data },
    { new: true, upsert: true }
  );
//
const getReturnRefund = async () => ReturnRefund.find({});

module.exports = {
  updateReturnRefund,
  getReturnRefund,
};
