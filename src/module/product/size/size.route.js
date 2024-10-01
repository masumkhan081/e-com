const { Router } = require("express");
const router = Router();
const sizeController = require("./size.controller");
//
router.post("/", sizeController.createSize);
router.get("/", sizeController.getSizes);
router.patch("/:id", sizeController.updateSize);
router.delete("/:id", sizeController.deleteSize);

module.exports = router;
