const GeneralSetting = require("./generalSetting.model");

const createGeneralSetting = async (data) => GeneralSetting.create(data);

const getGeneralSetting = async () => GeneralSetting.find({});

module.exports = {
  createGeneralSetting,
  getGeneralSetting,
};
