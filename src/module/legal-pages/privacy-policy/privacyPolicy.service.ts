 
import PrivacyPolicy from "./privacyPolicy.model";
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
export default {
  updatePrivacyPolicy,
  getPrivacyPolicy,
};
