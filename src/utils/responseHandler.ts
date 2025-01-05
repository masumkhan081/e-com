import { Response } from "express";
import httpStatus from "http-status";
//
interface resDataEntity { res: Response, data: unknown, entity: string };
// 
export function sendSingleFetchResponse({ res, data, entity }: resDataEntity) {
  const status_code = data ? response_map.fetch.code : response_map.notFound.code;
  const is_singular = false;
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
export function sendFetchResponse({ res, data, entity }: resDataEntity) {
  const status_code = response_map.fetch.code;
  res.status(status_code).json({
    status_code,
    success: true,
    message: response_map.fetch.message(entity),
    data,
  });
}

export function sendCreateResponse({ res, data, entity }: resDataEntity) {
  const status_code = response_map.create.code;
  res.status(status_code).json({
    success: true,
    message: response_map.create.message(entity),
    data,
  });
}

export function sendUpdateResponse({ res, data, entity }: resDataEntity) {
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

export function sendDeletionResponse({ res, data, entity }: resDataEntity) {
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

interface ResErrorEntity {
  res: Response;
  error: unknown;
  entity: string;
}

export function sendErrorResponse({ res, error, entity }: ResErrorEntity) {
  let status_code: number = response_map.serverError.code;
  let message: string = response_map.serverError.message;
  const messages: Record<string, string> = {};
  let type: string | undefined;

  console.log("error:  " + JSON.stringify(error));

  if (error instanceof Error) {
    // Handle cases where error is an instance of Error
    if (error.name === 'ValidationError' && (error as any).errors) {
      // Type Assertion: Treat 'error' as a specific type with 'errors' property
      status_code = 400;
      message = "Invalid data";
      type = "mongoose-error";

      const errors = (error as any).errors as Record<string, any>;
      for (const key in errors) {
        messages[key] = errors[key].message;
      }
    } else if ((error as any).code === 11000) {
      status_code = response_map.alreadyExist.code;
      message = response_map.alreadyExist.message(entity);
    } else if ((error as any).code === 404 || (error as any).code === 409) {
      status_code = (error as any).code;
      message = "error.message[entity]";
    }
  } else {
    // Handle cases where error is not an instance of Error (e.g., strings, objects)
    if (typeof error === 'string') {
      message = error;
    } else if (typeof error === 'object' && error !== null && 'message' in error) {
      // Check if 'message' property exists on the object
      message = (error as Record<string, any>).message;
    }
  }

  res.status(status_code).json({
    status_code,
    success: false,
    message,
    messages,
    type,
  });
}

export const response_map = {
  create: {
    code: 201,
    message: (entity: string) => `${entity}  created successfully`,
  },
  delete: { code: 200, message: (entity: string) => `${entity} deleted successfully` },
  update: { code: 200, message: (entity: string) => `${entity} updated successfully` },
  fetch: { code: 200, message: (entity: string) => `${entity} fetched successfully` },

  idNotFound: {
    code: 404,
    message: (entity: string) => `No resource (${entity}) with this ID.`,
  },
  alreadyExist: {
    code: 409, // Error code for "conflict" or "Already Exists" as mongodb return
    message: (entity: string) => `Resource (${entity}) already exists`,
  },
  alreadyUsed: {
    code: 409, // HTTP status code for "Conflict"
    message: (entity: string) =>
      `Cannot delete ${entity}: Resource is already used by other entities`,
  },
  //
  invalid: { code: 500, message: "Invalid Request" },
  badRequest: { code: 500, message: "Bad Request" },
  notFound: { code: 404, message: (entity: string) => `${entity} not found` },
  serverError: { code: 500, message: "Internal Server Error" },
  somethingWentWrong: { code: 500, message: "Something went wrong" },
  unauthorized: { code: 500, message: "Unauthorized Access" },
  forbidden: { code: 500, message: "Forbidden Access" },

  noData: { code: 204, message: `No Data` },
  failInUpdate: {
    code: 1000,
    message: (entity: string) => `${entity} failed to update`,
  },
  //

  creationFailed: { code: 400, message: "Creation failed" },
};


