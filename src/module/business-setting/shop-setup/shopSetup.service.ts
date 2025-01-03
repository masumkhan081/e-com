const ShopSetting = require("./shopSetup.model");

const manageShopSetting = async (data) =>
  await ShopSetting.findOneAndUpdate(
    {},
    { $set: data },
    { new: true, upsert: true }
  );
//
const getShopSettings = async () => ShopSetting.find({});

module.exports = {
  manageShopSetting,
  getShopSettings,
};
