const { Router } = require("express");
const router = Router();
const colorController = require("./color.controller");
// const validateRequest = require("../middlewares/validateRequest");
// const colorSchema = require("./color.validate");
//

router.post("/", colorController.createColor);
router.get("/", colorController.getColors);
router.patch("/:id", colorController.updateColor);
router.delete("/:id", colorController.deleteColor);

module.exports = router;
