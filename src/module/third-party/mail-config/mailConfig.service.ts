 
const { entities } = require("../../../config/constants");
const MailConfig = require("./mailConfig.model"); 
//
const updateMailConfig = async (data) =>
  await MailConfig.findOneAndUpdate(
    {},
    { $set: data },
    { new: true, upsert: true }
  );
//
const getMailConfig = async () => MailConfig.find({});

module.exports = {
  updateMailConfig,
  getMailConfig,
};
