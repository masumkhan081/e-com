const AboutUs = require("./aboutUs.model");
//
const updateAboutUs = async (data) =>
  await AboutUs.findOneAndUpdate(
    {},
    { $set: data },
    { new: true, upsert: true }
  );
//
const getAboutUs = async () => AboutUs.find({});

module.exports = {
  updateAboutUs,
  getAboutUs,
};
