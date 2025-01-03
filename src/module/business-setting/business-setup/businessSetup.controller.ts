const businessSetupService = require("./businessSetup.service");
const {
  sendErrorResponse,
  sendFetchResponse,
  sendSingleFetchResponse,
} = require("../../../utils/responseHandler");
const { entities } = require("../../../config/constants");

async function manageBusinessSetup(req, res) {
  try {
    const data = await businessSetupService.manageBusinessSetup(req.body);

    if (data) {
      return res.status(200).json({
        status: "success",
        message: "Business setup saved successfully.",
        data,
      });
    }
  } catch (error) {
    console.log("err: " + error.message);
    sendErrorResponse({
      res,
      error,
      entity: entities.business_setup,
    });
  }
}

async function getBusinessSetup(req, res) {
  try {
    const data = await businessSetupService.getBusinessSetup(req.query);

    sendSingleFetchResponse({
      res,
      data,
      entity: entities.business_setup,
    });
  } catch (error) {
    console.log("err: " + error.message);
    sendErrorResponse({
      res,
      error: data,
      entity: entities.business_setup,
    });
  }
}
//

module.exports = {
  manageBusinessSetup,
  getBusinessSetup,
};
