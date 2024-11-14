const generalSettingService = require("./generalSetting.service");

const {
  sendCreateResponse,
  sendErrorResponse,
  sendUpdateResponse,
  sendSingleFetchResponse,
} = require("../../../utils/responseHandler");
const { entities } = require("../../../config/constants");
const { fieldsMap, uploadHandler } = require("../../../utils/uploader");
const GeneralSetting = require("./generalSetting.model");

async function manageGeneralSetting(req, res) {
  let paths = {};
  try {
    const isExist = await GeneralSetting.findOne({}); // Check if a general setting already exists

    // Upload file paths for fields in the general setting
    const len = fieldsMap[entities.general_setting].length;
    for (let i = 0; i < len; i++) {
      const fieldName = fieldsMap[entities.general_setting][i].name;
      paths[fieldName] = await uploadHandler({
        entity: fieldName,
        file: req.files[fieldName][0],
      });
    }

    // Destructure request body values with defaults for update if the field is not provided
    const {
      website_name = isExist?.website_name,
      website_title = isExist?.website_title,
      footer_phone = isExist?.footer_section?.phone,
      footer_mail = isExist?.footer_section?.email,
      footer_text = isExist?.footer_section?.text,
      footer_address = isExist?.footer_section?.address,
      footer_description = isExist?.footer_section?.description,
      is_app_link_visible = isExist?.app_links?.is_app_link_visible,
      appstore_link = isExist?.app_links?.appstore_link,
      playstore_link = isExist?.app_links?.playstore_link,
    } = req.body;

    const website_logo = paths["website_logo"] || isExist?.website_logo;
    const textual_logo = paths["textual_logo"] || isExist?.textual_logo;

    // Construct general setting data with either new or existing values
    const generalSettingData = {
      website_name,
      website_title,
      website_logo,
      textual_logo,
      footer_section: {
        phone: footer_phone,
        email: footer_mail,
        text: footer_text,
        address: footer_address,
        description: footer_description,
      },
      app_links: {
        is_app_link_visible,
        appstore_link,
        playstore_link,
      },
    };

    let result;
    if (isExist) {
      // Update if the setting already exists
      console.log("exist ..  " + isExist._id);
      result = await GeneralSetting.findByIdAndUpdate(
        isExist._id,
        generalSettingData,
        {
          new: true,
        }
      );
      sendUpdateResponse({
        res,
        entity: entities.general_setting,
        data: result,
      });
    } else {
      // Create a new setting if it does not exist
      result = await GeneralSetting.create(generalSettingData);
      sendCreateResponse({
        res,
        entity: entities.general_setting,
        data: result,
      });
    }
  } catch (error) {
    console.log("err: " + error.message);
    sendErrorResponse({ res, error, entity: entities.general_setting });
  }
}

async function getGeneralSettings(req, res) {
  try {
    const data = await generalSettingService.getGeneralSetting(req.query);

    sendSingleFetchResponse({
      res,
      data,
      entity: entities.general_setting,
    });
  } catch (error) {
    console.log("err: " + error.message);
    sendErrorResponse({
      res,
      error: data,
      entity: entities.general_setting,
    });
  }
}
//
module.exports = {
  manageGeneralSetting,
  getGeneralSettings,
};
