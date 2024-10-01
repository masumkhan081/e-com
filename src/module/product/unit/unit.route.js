const { Router } = require("express");
const router = Router();
const unitController = require("./unit.controller"); 
// const categorySchema = require("./category.validate");
//
router.post("/", unitController.createUnit);
router.get("/", unitController.getUnits);
router.patch("/:id", unitController.updateUnit);
router.delete("/:id", unitController.deleteUnit);

module.exports = router;
