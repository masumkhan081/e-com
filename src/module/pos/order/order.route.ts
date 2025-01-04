import { Router } from "express";
const router = Router();
import orderController from "./order.controller";
import accessControl from "../../../middlewares/verifyToken";
import { allowed_roles } from "../../../config/constants";
import validateRequest from "../../../middlewares/validateRequest";
//
router.get("/", orderController.getOrders);
//
router.get("/request-delivery-otp/:id", orderController.requestDeliveryOtp);
//
router.post("/delivery-confirmation/:id", orderController.deliveryConfirmation);
//
router.patch(
  "/order/:id",
  accessControl([allowed_roles.seller, allowed_roles.seller]),
  orderController.updateOrder
);
//
router.delete("/:id", orderController.deleteOrder);

export default router;
