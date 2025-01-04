 
import { entities } from "../../../config/constants";
import TermCondition from "./termCondition.model";
import { getSearchAndPagination } from "../../../utils/pagination";
//
const updateTermCondition = async (data) =>
  await TermCondition.findOneAndUpdate(
    {},
    { $set: data },
    { new: true, upsert: true }
  );
//
const getTermCondition = async () => TermCondition.find({});

//
export default {
  updateTermCondition,
  getTermCondition,
};
