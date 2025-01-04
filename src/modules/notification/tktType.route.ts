import { Router } from "express";
const router = Router();
import tktTypeController from "./tktType.controller";
import validateRequest from "../../../middlewares/validateRequest";
import ticketIssueTypeSchmea from "./tktType.validate";
//
router.post("/", tktTypeController.createTktType);
router.get("/", tktTypeController.getTktTypes);
router.patch("/:id", tktTypeController.updateTktType);
router.delete("/:id", tktTypeController.deleteTktType);

export default router;
