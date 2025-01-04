import { Router } from "express";
const router = Router();
import addressController from "../controller/address.controller";
import validateRequest from "../middlewares/validateRequest";
import addressSchema from "../validation/address.validate";
//

router.post("/", validateRequest(addressSchema), addressController.createAddress);
router.get("/", addressController.getAddresses);
router.patch("/:id", addressController.updateAddress);
router.delete("/:id", addressController.deleteAddress);

export default router;
