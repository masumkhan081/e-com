const { Router } = require("express");
const router = Router();
const unitController = require("./unit.controller");
const validateRequest = require("../../../middlewares/validateRequest");
const { unitSchema, unitStatusSchema } = require("./unit.validate");
const accessControl = require("../../../middlewares/verifyToken");
const { allowed_roles } = require("../../../config/constants");
//
router.post(
  "/",
  accessControl([allowed_roles.seller]),
  validateRequest(unitSchema),
  unitController.createUnit
);
router.get("/", accessControl([allowed_roles.seller]), unitController.getUnits);
//
router.get(
  "/:id",
  accessControl([allowed_roles.seller]),
  unitController.getSingleUnit
);
//
router.patch(
  "/:id",
  accessControl([allowed_roles.seller]),
  unitController.updateUnit
);
//
router.patch(
  "/status/:id",
  accessControl([allowed_roles.seller]),
  validateRequest(unitStatusSchema),
  unitController.updateUnitStatus
);
//
router.delete(
  "/:id",
  accessControl([allowed_roles.seller]),
  unitController.deleteUnit
);

module.exports = router;
