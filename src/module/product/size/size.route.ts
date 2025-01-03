const { Router } = require("express");
const router = Router();
const sizeController = require("./size.controller");
const validateRequest = require("../../../middlewares/validateRequest");
const { sizeSchema, sizeStatusSchema } = require("./size.validate");
const accessControl = require("../../../middlewares/verifyToken");
const { allowed_roles } = require("../../../config/constants");
//
router.post(
  "/",
  accessControl([allowed_roles.seller]),
  validateRequest(sizeSchema),
  sizeController.createSize
);
router.get("/", accessControl([allowed_roles.seller]), sizeController.getSizes);
//
router.get(
  "/:id",
  accessControl([allowed_roles.seller]),
  sizeController.getSingleSize
);
//
router.patch(
  "/:id",
  accessControl([allowed_roles.seller]),
  sizeController.updateSize
);
//
router.patch(
  "/status/:id",
  accessControl([allowed_roles.seller]),
  validateRequest(sizeStatusSchema),
  sizeController.updateSizeStatus
);
//
router.delete(
  "/:id",
  accessControl([allowed_roles.seller]),
  sizeController.deleteSize
);

module.exports = router;
