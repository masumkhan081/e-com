import { Router } from "express";
const router = Router();
import customerController from "./customer.controller";
import { isPatchBodyValid, isPostBodyValid } from "./customer.validate";
//
router.post("/", customerController.createCustomer);
router.get("/", customerController.getCustomers);
router.patch("/:id", customerController.updateCustomer);
router.delete("/:id", customerController.deleteCustomer);

export default router;
