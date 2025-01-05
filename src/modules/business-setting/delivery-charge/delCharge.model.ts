 
import { Schema, model } from "mongoose";


const delChargeSchema = new Schema({
  zone: {
    type: String,
    required: true,
  },
  charge: {
    type: Number,
    required: true,
  },
});

const DeliveryCharge = model("delivery_charges", delChargeSchema);

export default DeliveryCharge;
