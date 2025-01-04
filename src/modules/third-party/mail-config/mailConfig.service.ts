 
import { entities } from "../../../config/constants";
import MailConfig from "./mailConfig.model"; 
//
const updateMailConfig = async (data) =>
  await MailConfig.findOneAndUpdate(
    {},
    { $set: data },
    { new: true, upsert: true }
  );
//
const getMailConfig = async () => MailConfig.find({});

export default {
  updateMailConfig,
  getMailConfig,
};
