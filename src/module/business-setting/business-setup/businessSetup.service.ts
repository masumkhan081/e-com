import BusinessSetup from "./businessSetup.model";

const manageBusinessSetup = async (data) =>
  await BusinessSetup.findOneAndUpdate(
    {},
    { $set: data },
    { new: true, upsert: true }
  );
//
const getBusinessSetup = async () => BusinessSetup.find({});
//

export default {
  manageBusinessSetup,
  getBusinessSetup,
};
