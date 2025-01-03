const { Router } = require("express");
const router = Router();
const shippingDeliveryPolicyController = require("./shippingDelivery.controller");
const validateRequest = require("../../../middlewares/validateRequest");
const { shippingAndDeliverySchema } = require("./shippingDelivery.validate");
const accessControl = require("../../../middlewares/verifyToken");
const { allowed_roles } = require("../../../config/constants");
//

router.get("/", shippingDeliveryPolicyController.getShippingDeliveryPolicy);
router.patch(
  "/",
  accessControl([allowed_roles.admin]),
  validateRequest(shippingAndDeliverySchema),
  shippingDeliveryPolicyController.updateShippingDeliveryPolicy
);

module.exports = router;
