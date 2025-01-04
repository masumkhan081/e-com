import socialLinkService from "./socialLink.service";
import SocialLink from "./socialLink.model";

const {
  sendCreateResponse,
  sendDeletionResponse,
  sendErrorResponse,
  sendFetchResponse,
  sendUpdateResponse,
} = require("../../../utils/responseHandler");
import httpStatus from "http-status";
import { promisify } from "util";
import fs from "fs";
import path from "path";
const unlinkAsync = promisify(fs.unlink);
import { entities } from "../../../config/constants";
import { fieldsMap, uploadHandler } from "../../../utils/uploader";
import { isPostBodyValid } from "./socialLink.validate";
import SocialkLink from "./socialLink.model";

async function createSocialLink(req, res, next) {
  try {
    const valid = isPostBodyValid({ files: req.files, bodyData: req.body });
    let fileUrl;
    console.log(JSON.stringify(valid));
    //
    if (valid.success) {
      const fieldName = fieldsMap[entities.social_link][0].name;

      fileUrl = await uploadHandler({
        entity: fieldName,
        file: req.files[fieldName][0],
      });

      console.log("fileUrl: " + fileUrl);

      try {
        const addResult = await SocialkLink.create({
          name: valid.name,
          is_active: valid.is_active,
          icon: fileUrl,
          link: valid.link,
        });
        sendCreateResponse({
          res,
          entity: entities.social_link,
          data: addResult,
        });
      } catch (error) {
        // await unlinkAsync(req.file.path);
        sendErrorResponse({ res, error, entity: entities.social_link });
      }
    } else {
      res.status(400).send({ message: valid.message });
    }
  } catch (error) {
    // await unlinkAsync(req.file.path);
    sendErrorResponse({ res, error, entity: entities.social_link });
  }
}
//
export const updateSocialLink: TypeController = async (req, res) => {
  try {
    const { name, link, is_active } = req.body;
    console.log("name, link, is_active >> " + name, link, is_active);
    const idUpdatableId = req.params.id;
    let fileUrl;
    //
    try {
      const updatableSclLink = await SocialLink.findById(idUpdatableId);
      if (updatableSclLink) {
        if (req.files["social_icon"]) {
          const fieldName = fieldsMap[entities.social_link][0].name;
          fileUrl = await uploadHandler({
            entity: fieldName,
            file: req.files[fieldName][0],
          });
          console.log("fileUrl:   " + fileUrl);

          const deleteUrl = path.join(
            __dirname,
            `../../../../${updatableSclLink.icon}`
          );

          console.log("deleteUrl:   " + deleteUrl);
          await unlinkAsync(deleteUrl);
          console.log("deleteUrl:   " + deleteUrl);
        }
        console.lo;
        const editResult = await SocialLink.findByIdAndUpdate(
          idUpdatableId,
          {
            name: name ? name : updatableSclLink.name,
            is_active: is_active ? is_active : updatableSclLink.is_active,
            link: link ? link : updatableSclLink.link,
            icon: fileUrl ? fileUrl : updatableSclLink.icon,
          },
          { new: true }
        );
        sendUpdateResponse({
          res,
          entity: entities.social_link,
          data: editResult,
        });
      } else {
        if (fileUrl) {
          await unlinkAsync(fileUrl);
        }
        res.send({
          success: false,
          status: 404,
          message: "Id not found",
        });
      }
    } catch (error) {
      console.log("error cash ... ");
      if (req.file.path) {
        await unlinkAsync(req.file.path);
      }
      sendErrorResponse({ res, error, entity: entities.social_link });
    }
  } catch (error) {
    console.log("error cash ... 2");
    sendErrorResponse({ res, error, entity: entities.social_link });
  }
}

//
export const getSocialLinks: TypeController = async (req, res) => {
  const data =  await socialLinkService.getSocialLinks(req.query);
  if (data instanceof Error) {
    sendErrorResponse({
      res,
      error:data,
      entity: entities.social_link,
    });
  } else {
    sendFetchResponse({
      res,
      data,
      entity: entities.social_link,
    });
  }
}
//
export const deleteSocialLink: TypeController = async (req, res) => {
  const data =  await socialLinkService.deleteSocialLink(req.params.id);
  if (data instanceof Error) {
    sendErrorResponse({
      res,
      error:data,
      entity: entities.social_link,
    });
  } else {
    sendDeletionResponse({
      res,
      data,
      entity: entities.social_link,
    });
  }
}
//
export default {
  createSocialLink,
  updateSocialLink,
  deleteSocialLink,
  getSocialLinks,
};
