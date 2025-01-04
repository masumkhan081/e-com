import { Router } from "express";
const router = Router();
import deliveryController from "./delivery.controller";
import validateRequest from "../../../middlewares/validateRequest";
//
router.post("/", deliveryController.createDelivery);
router.get("/", deliveryController.getDeliveries);
router.patch("/:id", deliveryController.updateDelivery);
router.delete("/:id", deliveryController.deleteDelivery);

export default router;
