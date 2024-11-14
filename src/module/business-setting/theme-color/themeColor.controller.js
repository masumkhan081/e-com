const themeColorService = require("./themeColor.service");
const httpStatus = require("http-status");

const {
  sendCreateResponse,
  sendDeletionResponse,
  sendErrorResponse,
  sendFetchResponse,
  sendUpdateResponse,
} = require("../../../utils/responseHandler");
const { entities } = require("../../../config/constants");

async function createThemeColor(req, res) {
  const data = await themeColorService.createThemeColor(req.body);
  if (data instanceof Error) {
    sendErrorResponse({
      res,
      error: data,
      entity: entities.theme_color,
    });
  } else {
    sendCreateResponse({
      res,
      data,
      entity: entities.theme_color,
    });
  }
}

async function getThemeColors(req, res) {
  const data = await themeColorService.getThemeColors(req.query);
  if (data instanceof Error) {
    sendErrorResponse({
      res,
      error: data,
      entity: entities.theme_color,
    });
  } else {
    sendFetchResponse({
      res,
      data,
      entity: entities.theme_color,
    });
  }
}
//
async function updateThemeColor(req, res) {
  const data = await themeColorService.updateThemeColor({
    id: req.params.id,
    data: req.body,
  });
  if (data instanceof Error) {
    sendErrorResponse({
      res,
      error: data,
      entity: entities.theme_color,
    });
  } else {
    sendUpdateResponse({
      res,
      data,
      entity: entities.theme_color,
    });
  }
}
//
async function deleteThemeColor(req, res) {
  try {
    const data = await themeColorService.deleteThemeColor(req.params.id);
    if (data instanceof Error) {
      sendErrorResponse({
        res,
        error: data,
        entity: entities.theme_color,
      });
    } else {
      sendDeletionResponse({
        res,
        data,
        entity: entities.theme_color,
      });
    }
  } catch (error) {
    console.log(first);
  }
}
//
module.exports = {
  createThemeColor,
  updateThemeColor,
  deleteThemeColor,
  getThemeColors,
};
