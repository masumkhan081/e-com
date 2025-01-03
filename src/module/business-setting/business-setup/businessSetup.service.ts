const BusinessSetup = require("./businessSetup.model");

const manageBusinessSetup = async (data) =>
  await BusinessSetup.findOneAndUpdate(
    {},
    { $set: data },
    { new: true, upsert: true }
  );
//
const getBusinessSetup = async () => BusinessSetup.find({});
//

module.exports = {
  manageBusinessSetup,
  getBusinessSetup,
};
