 
import ShippingDeliveryPolicy from "./shippingDelivery.model"; 
//
const updateShippingDeliveryPolicy = async (data) =>
  await ShippingDeliveryPolicy.findOneAndUpdate(
    {},
    { $set: data },
    { new: true, upsert: true }
  );
//
const getShippingDeliveryPolicy = async () => ShippingDeliveryPolicy.find({});

export default {
  updateShippingDeliveryPolicy,
  getShippingDeliveryPolicy,
};
