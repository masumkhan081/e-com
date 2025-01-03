const returnRefundService = require("./returnRefund.service");
const {
  sendCreateResponse,
  sendDeletionResponse,
  sendErrorResponse,
  sendFetchResponse,
  sendUpdateResponse,
  sendSingleFetchResponse,
} = require("../../../utils/responseHandler");
const { entities } = require("../../../config/constants");

const entity = entities.return_and_refund_policy;

async function getReturnRefunds(req, res) {
  try {
    const data = await returnRefundService.getReturnRefund();

    sendSingleFetchResponse({
      res,
      data: data[0],
      entity,
      is_singular: true,
    });
  } catch (error) {
    console.log("err: " + error.message);
    sendErrorResponse({
      res,
      error: error,
      entity,
    });
  }
}
//
async function updateReturnRefund(req, res) {
  try {
    const result = await returnRefundService.updateReturnRefund(req.body);

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
      entity,
    });
  }
}

//
module.exports = {
  updateReturnRefund,
  getReturnRefunds,
};
