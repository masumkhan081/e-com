const { Router } = require("express");
const router = Router();
const themeColorController = require("./themeColor.controller");
const { themeColorSchema } = require("./themeColor.validate");
const validateRequest = require("../../../middlewares/validateRequest");
const accessControl = require("../../../middlewares/verifyToken");
const { allowed_roles } = require("../../../config/constants");
//
router.post(
  "/",
  accessControl([allowed_roles.admin]),
  validateRequest(themeColorSchema),
  themeColorController.createThemeColor
);
//
router.get(
  "/",
  accessControl([allowed_roles.admin]),
  themeColorController.getThemeColors
);
router.patch(
  "/:id",
  accessControl([allowed_roles.admin]),
  themeColorController.updateThemeColor
);
router.delete(
  "/:id",
  accessControl([allowed_roles.admin]),
  themeColorController.deleteThemeColor
);

module.exports = router;
