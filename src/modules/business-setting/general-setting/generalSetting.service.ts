import GeneralSetting from "./generalSetting.model";

const createGeneralSetting = async (data) => GeneralSetting.create(data);

const getGeneralSetting = async () => GeneralSetting.find({});

export default {
  createGeneralSetting,
  getGeneralSetting,
};
