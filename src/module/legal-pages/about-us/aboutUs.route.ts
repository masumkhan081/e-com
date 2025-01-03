const { Router } = require("express");
const router = Router();
const aboutUsController = require("./aboutUs.controller");
const validateRequest = require("../../../middlewares/validateRequest");
const { aboutUsSchema } = require("./aboutUs.validate");
const accessControl = require("../../../middlewares/verifyToken");
const { allowed_roles } = require("../../../config/constants");

//

router.get("/", aboutUsController.getAboutUs);
router.patch(
  "/:id",
  accessControl([allowed_roles.admin]),
  validateRequest(aboutUsSchema),
  aboutUsController.updateAboutUs
);

module.exports = router;
