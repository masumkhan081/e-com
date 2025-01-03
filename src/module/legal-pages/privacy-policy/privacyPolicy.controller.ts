const privacyPolicyService = require("./privacyPolicy.service");
const PrivacyPolicy = require("./privacyPolicy.model");

const {
  sendErrorResponse,
  sendFetchResponse,
  sendSingleFetchResponse,
} = require("../../../utils/responseHandler");
const { entities } = require("../../../config/constants");
//

async function getPrivacyPolicy(req, res) {
  try {
    const data = await privacyPolicyService.getPrivacyPolicy();

    sendSingleFetchResponse({
      res,
      data: data,
      entity: entities.privacy_policy,
    });
  } catch (error) {
    console.log("err: " + error.message);
    sendErrorResponse({
      res,
      error: error,
      entity: entities.privacy_policy,
    });
  }
}
//

async function managePrivacyPolicy(req, res) {
  try {
    const result = await privacyPolicyService.updatePrivacyPolicy(req.body);

    if (result) {
      return res.status(200).json({
        status: "success",
        message: result.isNew
          ? "Privacy policy created successfully."
          : "Privacy policy updated successfully.",
        data: result,
      });
    }

    // Handle the case where no result was returned
    return res.status(404).json({
      status: "error",
      message: "Privacy policy not found or could not be updated.",
    });
  } catch (error) {
    sendErrorResponse({
      res,
      error: error, // Use 'error' instead of 'data'
      entity: entities.privacy_policy,
    });
  }
}

//
module.exports = {
  managePrivacyPolicy,
  getPrivacyPolicy,
};
