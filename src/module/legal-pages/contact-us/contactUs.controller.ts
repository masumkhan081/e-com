const contactUsService = require("./contactUs.service");

const {
  sendSingleFetchResponse,
  sendDeletionResponse,
  sendErrorResponse,
  sendUpdateResponse,
} = require("../../../utils/responseHandler");
const { entities } = require("../../../config/constants");

async function getContactUs(req, res) {
  try {
    const data = await contactUsService.getContactUs();
    sendSingleFetchResponse({
      res,
      data: data[0],
      entity: entities.contact_us,
    });
  } catch (error) {
    console.log("err: " + error.message);
    sendErrorResponse({
      res,
      error: data,
      entity: entities.contact_us,
    });
  }
}
//

async function updateContactUs(req, res) {
  try {
    const data = await contactUsService.updateContactUs(req.body);

    sendUpdateResponse({
      res,
      data,
      entity: entities.contact_us,
    });
  } catch (error) {
    console.log("err: " + error.message);
    sendErrorResponse({
      res,
      error: data,
      entity: entities.contact_us,
    });
  }
}

//
module.exports = {
  updateContactUs,
  getContactUs,
};
