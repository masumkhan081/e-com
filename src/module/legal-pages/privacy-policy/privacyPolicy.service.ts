 
const PrivacyPolicy = require("./privacyPolicy.model");
//
const updatePrivacyPolicy = async (data) =>
  await PrivacyPolicy.findOneAndUpdate(
    {},
    { $set: data },
    { new: true, upsert: true }
  );
//
const getPrivacyPolicy = async () => PrivacyPolicy.find({});

//
module.exports = {
  updatePrivacyPolicy,
  getPrivacyPolicy,
};
