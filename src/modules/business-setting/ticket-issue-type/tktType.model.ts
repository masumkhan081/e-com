 
import { Schema, model } from "mongoose";


const tktTypeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  is_active: {
    type: String,
    required: true,
  },
});

const TktType = model("ticket_types", tktTypeSchema);

export default TktType;
