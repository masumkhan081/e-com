import { Router } from "express";
const router = Router();
import delChargeController from "./delCharge.controller";
//
router.post("/", delChargeController.createDeliveryCharge);
router.get("/", delChargeController.getDeliveryCharges);
router.patch("/:id", delChargeController.updateDeliveryCharge);
router.delete("/:id", delChargeController.deleteDeliveryCharge);
//
export default router;

