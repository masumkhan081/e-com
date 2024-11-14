const { Router } = require("express");
const router = Router();
const riderController = require("./rider.controller");
const { uploadRiderProfile } = require("../../../utils/uploader");
const { allowed_roles } = require("../../../config/constants");
const accessControl = require("../../../middlewares/verifyToken");
const validateRequest = require("../../../middlewares/validateRequest");
const { riderSchema } = require("./rider.validate");
//
router.post(
  "/",
  accessControl([allowed_roles.admin]),
  uploadRiderProfile,
  validateRequest(riderSchema),
  riderController.createRider
);
router.get("/", riderController.getRiders);
router.get("/:id", riderController.getSingleRider);
router.patch(
  "/:id",
  accessControl([allowed_roles.admin]),
  uploadRiderProfile,
  riderController.updateRider
);
router.delete("/:id", riderController.deleteRider);

module.exports = router;
