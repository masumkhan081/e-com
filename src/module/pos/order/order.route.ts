const { Router } = require("express");
const router = Router();
const orderController = require("./order.controller");
const accessControl = require("../../../middlewares/verifyToken");
const { allowed_roles } = require("../../../config/constants");
const validateRequest = require("../../../middlewares/validateRequest");
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

module.exports = router;
