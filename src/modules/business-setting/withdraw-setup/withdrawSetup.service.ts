import WithdrawSetting from "./withdrawSetup.model";

const manageWithdrawSetting = async (data) =>
  await WithdrawSetting.findOneAndUpdate(
    {},
    { $set: data },
    { new: true, upsert: true }
  );
//
const getWithdrawSetting = async () => WithdrawSetting.find({});

export default {
  manageWithdrawSetting,
  getWithdrawSetting,
};
