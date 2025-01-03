const { Router } = require("express");
const router = Router();
const colorController = require("./color.controller");
const validateRequest = require("../../../middlewares/validateRequest");
const { colorSchema } = require("./color.validate");
const accessControl = require("../../../middlewares/verifyToken");
const { allowed_roles } = require("../../../config/constants");

router.post(
  "/",
  accessControl([allowed_roles.seller]),
  validateRequest(colorSchema),
  colorController.createColor
);
router.get("/", colorController.getColors);
//
router.get(
  "/:id",
  accessControl([allowed_roles.seller]),
  colorController.getSingleColor
);
//
router.patch(
  "/:id",
  accessControl([allowed_roles.seller]),
  colorController.updateColor
);
//
router.patch(
  "/status/:id",
  accessControl([allowed_roles.seller]),
  colorController.updateColorStatus
);
//
router.delete(
  "/:id",
  accessControl([allowed_roles.seller]),
  colorController.deleteColor
);

module.exports = router;
