 
import ContactUs from "./contactUs.model";
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

export default {
  updateContactUs,
  getContactUs,
};
