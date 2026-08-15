import type { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { hasZodFastifySchemaValidationErrors } from "fastify-type-provider-zod";
import {
  InternalServerError,
  KnownError,
  NotFoundError,
  ValidationError,
} from "./errors";

export function errorHandler(
  error: FastifyError,
  _req: FastifyRequest,
  res: FastifyReply,
) {
  if (error instanceof ValidationError) {
    return res.status(422).send({
      status_code: 422,
      code: error.code,
      message: error.message,
      issues: error.issues.map((issue) => ({
        code: issue.code,
        path: issue.path[0],
        message: issue.message,
      })),
    });
  }

  if (hasZodFastifySchemaValidationErrors(error)) {
    return res.status(422).send({
      status_code: 422,
      code: "VALIDATION_ERROR",
      message: "Invalid payload",
      issues: error.validation,
    });
  }

  if (error.code === "FST_ERR_CTP_EMPTY_JSON_BODY") {
    return res.status(422).send({
      status_code: 422,
      code: "VALIDATION_ERROR",
      message: "Invalid payload",
      issues: [
        {
          code: "required",
          message: "Request body is required",
        },
      ],
    });
  }

  if (error.code === "FST_ERR_CTP_INVALID_JSON_BODY") {
    return res.status(400).send({
      status_code: 400,
      code: "BAD_REQUEST",
      message: "Request body contains invalid JSON",
    });
  }

  const normalizedError =
    error instanceof KnownError ? error : new InternalServerError();

  return res.status(normalizedError.statusCode).send({
    status_code: normalizedError.statusCode,
    code: normalizedError.code,
    message: normalizedError.message,
  });
}

export function notFoundHandler(req: FastifyRequest, res: FastifyReply) {
  const error = new NotFoundError(req.method, req.url);
  return res.status(error.statusCode).send({
    status_code: error.statusCode,
    code: error.code,
    message: error.message,
  });
}
