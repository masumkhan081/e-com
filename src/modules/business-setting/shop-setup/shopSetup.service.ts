import ShopSetting from "./shopSetup.model";

const manageShopSetting = async (data) =>
  await ShopSetting.findOneAndUpdate(
    {},
    { $set: data },
    { new: true, upsert: true }
  );
//
const getShopSettings = async () => ShopSetting.find({});

export default {
  manageShopSetting,
  getShopSettings,
};
