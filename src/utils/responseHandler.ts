import httpStatus from "http-status";
//
//
function sendSingleFetchResponse({ res, data, entity, is_singular = false }) {
  const status_code = data ? response_map.fetch.code : response_map.notFound.code;
  res.status(status_code).json({
    status_code,
    success: data ? true : false,
    message: data
      ? response_map.fetch.message(entity)
      : is_singular
      ? response_map.noData.message
      : response_map.idNotFound.message(entity),
    data,
  });
}
//
function sendFetchResponse({ res, data, entity }) {
  const status_code = response_map.fetch.code;
  res.status(status_code).json({
    status_code,
    success: true,
    message: response_map.fetch.message(entity),
    data,
  });
}

function sendCreateResponse({ res, data, entity }) {
  const status_code = response_map.create.code;
  res.status(status_code).json({
    success: true,
    message: response_map.create.message(entity),
    data,
  });
}

function sendUpdateResponse({ res, data, entity }) {
  const status_code = data
    ? response_map.update.code
    : response_map.notFound.code;
  res.status(status_code).json({
    status_code,
    success: data ? true : false,
    message: data
      ? response_map.update.message(entity)
      : response_map.idNotFound.message(entity),
    data,
  });
}

function sendDeletionResponse({ res, data, entity }) {
  const status_code = data
    ? response_map.delete.code
    : response_map.notFound.code;
  res.status(status_code).json({
    status_code,
    success: data ? true : false,
    message: data
      ? response_map.delete.message(entity)
      : response_map.idNotFound.message(entity),
    data,
  });
}

function sendErrorResponse({ res, error, entity }) {
  let status_code;
  let message;
  const messages = {};
  let type;
  //
  console.log("error:  " + JSON.stringify(error));
  //  in case of errors based on mongoose schema fields
  if (error?.name == "ValidationError") {
    const errors = error.errors;
    const keys = Object.keys(errors);
    message = "Invalid data";
    for (let i = 0; i < keys.length; i++) {
      messages[keys[i]] = errors[keys[i]].message;
    }
    status_code = 400;
    type = "mongoose-error";
  }
  // Duplicate key error code from db/schema
  else if (error?.code === 11000) {
    status_code = response_map.alreadyExist.code;
    message = response_map.alreadyExist.message(entity); // already exist message relating with the entity
  }
  //  Handles the case of - id not found (404), already exist(409), already used(409)
  else if (error?.code === 404 || error?.code === 409) {
    status_code = error.code;
    message = error.message(entity); // message relating with the entity(entity)
    console.log("msg: " + message);
  }
  // all the other cases
  else {
    status_code = response_map.serverError.code;
    message = response_map.serverError.message;
  }
  res.status(status_code).json({
    status_code,
    success: false,
    message,
    messages,
    type,
  });
}

const response_map = {
  create: {
    code: 201,
    message: (entity) => `${entity}  created successfully`,
  },
  delete: { code: 200, message: (entity) => `${entity} deleted successfully` },
  update: { code: 200, message: (entity) => `${entity} updated successfully` },
  fetch: { code: 200, message: (entity) => `${entity} fetched successfully` },

  idNotFound: {
    code: 404,
    message: (entity) => `No resource (${entity}) with this ID.`,
  },
  alreadyExist: {
    code: 409, // Error code for "conflict" or "Already Exists" as mongodb return
    message: (entity) => `Resource (${entity}) already exists`,
  },
  alreadyUsed: {
    code: 409, // HTTP status code for "Conflict"
    message: (entity) =>
      `Cannot delete ${entity}: Resource is already used by other entities`,
  },
  //
  invalid: { code: 500, message: "Invalid Request" },
  badRequest: { code: 500, message: "Bad Request" },
  notFound: { code: 404, message: (entity) => `${entity} not found` },
  serverError: { code: 500, message: "Internal Server Error" },
  somethingWentWrong: { code: 500, message: "Something went wrong" },
  unauthorized: { code: 500, message: "Unauthorized Access" },
  forbidden: { code: 500, message: "Forbidden Access" },

  noData: { code: 204, message: `No Data` },
  failInUpdate: {
    code: 1000,
    message: (entity) => `${entity} failed to update`,
  },
  //

  creationFailed: { code: 400, message: "Creation failed" },
};

export default {
  sendFetchResponse,
  sendSingleFetchResponse,
  sendCreateResponse,
  sendDeletionResponse,
  sendErrorResponse,
  sendUpdateResponse,
  response_map,
};
