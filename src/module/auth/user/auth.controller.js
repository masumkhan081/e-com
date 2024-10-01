const authService = require("./auth.service");
const httpStatus = require("http-status");
const config = require("../../../config/index");
const userModel = require("./user.model");
const {
  sendCreateResponse,
  sendDeletionResponse,
  sendErrorResponse,
  sendFetchResponse,
  sendUpdateResponse,
  sendAuthResponse,
  success_msg,
} = require("../../../utils/responseHandler");
const { operableEntities } = require("../../../config/constants");
//
async function registerUser(req, res) {
  const { email, password } = req.body;
  await authService.register({
    res,
    email,
    password,
  });
}

async function validateEmail(req, res) {
  const { email, otp, token } = req.body;
  await authService.validateEmail({
    res,
    userEmail: email,
    userOtp: otp,
    token,
  });
}

async function login(req, res) {
  try {
    await authService.login({ res, data: req.body });
  } catch (error) {
    res.status(500).send({
      success: false,
      statusCode: 500,
      message: "Server error",
    });
  }
}

async function logout(req, res) {
  res.clearCookie(config.tkn_header_key);
  res.send({ status: 200, message: "User logged out succesfully" });
}

async function sendResetMail(req, res) {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    await authService.sendResetMail({
      res,
      user,
    });
  } catch (error) {
    res.send({
      status: 400,
      success: false,
      message: "internal server error",
    });
  }
}

async function resetPw(req, res) {
  await authService.resetPw({ token: req.params.token, res });
}

async function updatePw(req, res) {
  const { email, password, confirmPassword } = req.body;
  await authService.updatePw({ res, email, password, confirmPassword });
}
async function sendOTPToEmail(req, res) {
  const { email } = req.body;

  await authService.sendOTPToEmail(email);
}

async function createUser(req, res) {
  const result = await addressService.createUser(req.body);
  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.address });
  } else {
    sendCreateResponse({ res, data: result, what: operableEntities.address });
  }
}

async function getAddresses(req, res) {
  const result = await addressService.getAddresses(req.query);
  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.address });
  } else {
    sendFetchResponse({ res, data: result, what: operableEntities.address });
  }
}
//
async function updateAddress(req, res) {
  const result = await addressService.updateAddress({
    id: req.params.id,
    data: req.body,
  });
  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.address });
  } else {
    sendUpdateResponse({ res, data: result, what: operableEntities.address });
  }
}
//
async function deleteAddress(req, res) {
  const result = await addressService.deleteAddress(req.params.id);
  if (result instanceof Error) {
    sendErrorResponse({ res, error: result, what: operableEntities.address });
  } else {
    sendDeletionResponse({ res, data: result, what: operableEntities.address });
  }
}

//
module.exports = {
  registerUser,
  login,
  logout,
  resetPw,
  updatePw,
  sendOTPToEmail,
  sendResetMail,
  validateEmail,
};
