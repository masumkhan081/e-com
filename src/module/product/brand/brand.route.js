const { Router } = require("express");
const router = Router();
const brandController = require("./brand.controller");
const validateRequest = require("../../../middlewares/validateRequest");
const { brandSchema } = require("./brand.validate");
//
// router.post("/", validateRequest(brandSchema), brandController.createBrand);
router.post("/", brandController.createBrand);
router.get("/", brandController.getBrands);
router.patch("/:id", brandController.updateBrand);
router.delete("/:id", brandController.deleteBrand);

module.exports = router;
