import type { ZodIssue } from "zod";

export abstract class KnownError extends Error {
  abstract readonly statusCode: number;
  abstract readonly code: string;
}

export class BadRequestError extends KnownError {
  readonly statusCode = 400;
  readonly code = "BAD_REQUEST";
}

export class UnauthorizedError extends KnownError {
  readonly statusCode = 401;
  readonly code = "UNAUTHORIZED";
}

export class ForbiddenError extends KnownError {
  readonly statusCode = 403;
  readonly code = "FORBIDDEN";
}

export class NotFoundError extends KnownError {
  readonly statusCode = 404;
  readonly code = "NOT_FOUND";

  constructor(method: string, url: string) {
    super(`Route ${method} ${url} not found`);
  }
}

export class ConflictError extends KnownError {
  readonly statusCode = 409;
  readonly code = "CONFLICT";
}

export class ValidationError extends KnownError {
  readonly statusCode = 422;
  readonly code = "VALIDATION_ERROR";
  readonly issues: ZodIssue[];

  public constructor(message: string, issues: ZodIssue[]) {
    super(message);
    this.issues = issues;
  }
}

export class InternalServerError extends KnownError {
  readonly statusCode = 500;
  readonly code = "INTERNAL_SERVER_ERROR";

  constructor() {
    super("An unexpected internal error has occurred");
  }
}
