import { Router } from "express";
const router = Router();
import quickLinkController from "./quickLink.controller";
//
router.post("/", quickLinkController.createQuickLink);
router.get("/", quickLinkController.getQuickLinks);
router.patch("/:id", quickLinkController.updateQuickLink);
router.delete("/:id", quickLinkController.deleteQuickLink);

export default router;
