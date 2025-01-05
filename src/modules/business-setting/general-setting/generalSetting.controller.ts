import { Request, Response } from 'express';
import generalSettingService from './generalSetting.service';
import { entities } from '../../../config/constants';
import { fieldsMap, uploadHandler } from '../../../utils/uploader';
import GeneralSetting from './generalSetting.model';
import {
  sendCreateResponse,
  sendErrorResponse,
  sendUpdateResponse,
  sendSingleFetchResponse,
} from '../../../utils/responseHandler';

type TypeController = (req: Request, res: Response) => Promise<void>;
interface File {
  // Define the properties of your File object here
  fieldname: string;
  originalname: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
}

interface FilesMap {
  [fieldname: string]: File[];
}

export const manageGeneralSetting: TypeController = async (req, res) => {
  const paths: Record<string, string> = {};

  try {
    const isExist = await GeneralSetting.findOne({});

    // Upload file paths for fields in the general setting
    for (const field of fieldsMap[entities.general_setting]) {

      // 
      const uploadedFile = (req.files as FilesMap)?.[field.name]?.[0];
      if (uploadedFile) {
        paths[field.name] = await uploadHandler({
          entity: field.name,
          file: req.files[field.name][0],
        });
      }
      //  
    }

    // Destructure request body values with defaults for update if the field is not provided
    const {
      website_name = isExist?.website_name || '',
      website_title = isExist?.website_title || '',
      footer_phone = isExist?.footer_section?.phone || '',
      footer_mail = isExist?.footer_section?.email || '',
      footer_text = isExist?.footer_section?.text || '',
      footer_address = isExist?.footer_section?.address || '',
      footer_description = isExist?.footer_section?.description || '',
      is_app_link_visible = isExist?.app_links?.is_app_link_visible || false,
      appstore_link = isExist?.app_links?.appstore_link || '',
      playstore_link = isExist?.app_links?.playstore_link || '',
    } = req.body;

    const website_logo = paths["website_logo"] || isExist?.website_logo || '';
    const textual_logo = paths["textual_logo"] || isExist?.textual_logo || '';

    // Construct general setting data with either new or existing values
    const generalSettingData: GeneralSetting = {
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

    let result: GeneralSetting | null;

    if (isExist) {
      // Update if the setting already exists
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
};

export const getGeneralSettings: TypeController = async (req, res) => {
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
};

export default {
  manageGeneralSetting,
  getGeneralSettings,
};