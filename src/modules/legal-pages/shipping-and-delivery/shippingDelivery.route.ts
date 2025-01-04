import { Router } from "express";
const router = Router();
import shippingDeliveryPolicyController from "./shippingDelivery.controller";
import validateRequest from "../../../middlewares/validateRequest";
import { shippingAndDeliverySchema } from "./shippingDelivery.validate";
import accessControl from "../../../middlewares/verifyToken";
import { allowed_roles } from "../../../config/constants";
//

router.get("/", shippingDeliveryPolicyController.getShippingDeliveryPolicy);
router.patch(
  "/",
  accessControl([allowed_roles.admin]),
  validateRequest(shippingAndDeliverySchema),
  shippingDeliveryPolicyController.updateShippingDeliveryPolicy
);

export default router;
