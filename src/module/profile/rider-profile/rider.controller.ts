import riderService from "./rider.service";
import { promisify } from "util";
import fs from "fs";
const unlinkAsync = promisify(fs.unlink);
const {
  sendCreateResponse,
  sendDeletionResponse,
  sendErrorResponse,
  sendFetchResponse,
  sendUpdateResponse,
  sendSingleFetchResponse,
} = require("../../../utils/responseHandler");
import { entities, allowed_roles } from "../../../config/constants";
import { fieldsMap, uploadHandler } from "../../../utils/uploader";
import Rider from "./rider.model";
import { removeFile } from "../../../utils/fileHandle";
import User from "../../user/user.model";
import { getHashedPassword } from "../../../utils/tokenisation";
//
export const getSingleRider: TypeController = async (req, res) => {
  try {
    const data = await riderService.getSingleRider(req.params.id);
    if (data instanceof Error) {
      sendErrorResponse({
        res,
        error: data,
        entity: entities.rider,
      });
    } else {
      sendSingleFetchResponse({ res, data, entity: entities.rider });
    }
  } catch (error) {
    sendErrorResponse({ res, error, entity: entities.rider });
  }
}

export const createRider: TypeController = async (req, res) => {
  const fieldName = fieldsMap[entities.rider][0].name;
  let fileUrl;
  let rider_profile;
  let user;

  try {
    // Destructure properties from req.body
    const {
      full_name,
      phone,
      email,
      password,
      confirm_password,
      vehicle_type,
      driver_license,
      gender,
      dob,
      address,
    } = req.body;

    if (!req?.files?.[fieldName]) {
      return res.status(400).json({
        success: false,
        message: "Rider profile image is required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exist with that email",
      });
    }

    if (password !== confirm_password) {
      return res.status(400).json({
        success: false,
        message: "Password and confirm password doesn't match.",
      });
    }

    fileUrl = await uploadHandler({
      entity: fieldName,
      file: req.files[fieldName][0],
    });
    // Create the rider
    rider_profile = await Rider.create({
      full_name,
      rider_profile: fileUrl,
      phone,
      vehicle_type,
      driver_license,
      gender,
      dob,
      address,
    });
    //
    const hashedPassword = await getHashedPassword(password);
    const role = allowed_roles.rider;

    user = await User.create({
      email,
      password: hashedPassword,
      role,
      profile_id: rider_profile._id,
      is_verified: true,
    });

    sendCreateResponse({
      res,
      entity: entities.rider,
      data: rider_profile,
    });
  } catch (error) {
    // Clean up file if uploaded
    if (user) {
      await User.findByIdAndDelete(user._id);
    }
    if (rider_profile) {
      await Rider.findByIdAndDelete(rider_profile._id);
    }
    if (fileUrl) {
      removeFile({ fileUrl });
    }
    sendErrorResponse({ res, error, entity: entities.rider });
  }
}

export const updateRider: TypeController = async (req, res) => {
  try {
    const {
      full_name,
      phone,
      vehicle_type,
      driver_license,
      gender,
      dob,
      address,
      is_active,
    } = req.body;

    const idUpdatableRider = req.params.id;
    let fileUrl;
    //
    try {
      const updatableRider = await Rider.findById(idUpdatableRider);
      if (!updatableRider) {
        return res.status(400).json({
          success: false,
          message: "No rider exist with this id.",
        });
      }

      const fieldName = fieldsMap[entities.rider][0].name;
      if (req?.files?.[fieldName]) {
        fileUrl = await uploadHandler({
          entity: fieldName,
          file: req.files[fieldName][0],
        });
        removeFile({ fileUrl: updatableRider.rider_profile });
      }
      const editResult = await Rider.findByIdAndUpdate(
        idUpdatableRider,
        {
          full_name: full_name || updatableRider.full_name,
          phone: phone || updatableRider.phone,
          vehicle_type: vehicle_type || updatableRider.vehicle_type,
          driver_license: driver_license || updatableRider.driver_license,
          gender: gender || updatableRider.gender,
          dob: dob || updatableRider.dob,
          address: address || updatableRider.address,
          is_active:
            is_active !== undefined ? is_active : updatableRider.is_active, // Check for undefined
          rider_profile: fileUrl || updatableRider.rider_profile,
        },
        { new: true }
      );
      return sendUpdateResponse({
        res,
        entity: entities.rider,
        data: editResult,
      });
    } catch (error) {
      console.log("error: controller: updateRider " + error.message);
      if (fileUrl) {
        removeFile({ fileUrl });
      }
      return sendErrorResponse({ res, error, entity: entities.rider });
    }
  } catch (error) {
    console.log("error: controller: updateRider " + error.message);
    return sendErrorResponse({ res, error, entity: entities.rider });
  }
}
//
export const getRiders: TypeController = async (req, res) => {
  const data = await riderService.getRiders(req.query);
  if (data instanceof Error) {
    sendErrorResponse({ res, error: data, entity: entities.rider });
  } else {
    sendFetchResponse({ res, data, entity: entities.rider });
  }
}
//
export const deleteRider: TypeController = async (req, res) => {
  const data = await riderService.deleteRider(req.params.id);
  if (data instanceof Error) {
    sendErrorResponse({ res, error: data, entity: entities.rider });
  } else {
    sendDeletionResponse({ res, data, entity: entities.rider });
  }
}
//
export default {
  createRider,
  updateRider,
  deleteRider,
  getRiders,
  getSingleRider,
};
