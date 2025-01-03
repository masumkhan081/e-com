const { Router } = require("express");
const router = Router();
const contactUsController = require("./contactUs.controller");
const { contactUsSchema } = require("./contactUs.validate");
const accessControl = require("../../../middlewares/verifyToken");
const { allowed_roles } = require("../../../config/constants");
const validateRequest = require("../../../middlewares/validateRequest");
//
router.get("/", contactUsController.getContactUs);
router.patch(
  "/",
  accessControl([allowed_roles.admin]),
  validateRequest(contactUsSchema),
  contactUsController.updateContactUs
);

module.exports = router;
