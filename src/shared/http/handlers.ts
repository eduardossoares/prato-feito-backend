import type { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { InternalServerError, KnownError, NotFoundError } from "./errors";

function isValidError(error: unknown): error is KnownError {
  return error instanceof KnownError;
}

export function errorHandler(
  error: FastifyError,
  _req: FastifyRequest,
  res: FastifyReply,
) {
  const normalizedError = isValidError(error)
    ? error
    : new InternalServerError();

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
