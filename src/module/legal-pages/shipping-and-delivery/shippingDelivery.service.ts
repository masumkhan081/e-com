 
const ShippingDeliveryPolicy = require("./shippingDelivery.model"); 
//
const updateShippingDeliveryPolicy = async (data) =>
  await ShippingDeliveryPolicy.findOneAndUpdate(
    {},
    { $set: data },
    { new: true, upsert: true }
  );
//
const getShippingDeliveryPolicy = async () => ShippingDeliveryPolicy.find({});

module.exports = {
  updateShippingDeliveryPolicy,
  getShippingDeliveryPolicy,
};
