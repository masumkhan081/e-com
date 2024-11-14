/* eslint-disable no-unused-vars */
const ContactUs = require("./contactUs.model");
//

//
const getContactUs = async () => ContactUs.find({});
//
const updateContactUs = async (data) =>
  await ContactUs.findOneAndUpdate(
    {},
    { $set: data },
    { new: true, upsert: true }
  );
//

module.exports = {
  updateContactUs,
  getContactUs,
};
