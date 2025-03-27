class BaseError extends Error {
  public status: number;

  constructor(message: string, name: string, status: number) {
    super(message);
    this.name = name;
    this.status = status;
  }
}

class NotFoundError extends BaseError {
  constructor(message: string) {
    super(message, "NotFoundError", 404);
  }
}

class BadRequestError extends BaseError {
  constructor(message: string) {
    super(message, "BadRequestError", 400);
  }
}

class UnauthorizedError extends BaseError {
  constructor(message: string) {
    super(message, "UnauthorizedError", 401);
  }
}

class ForbiddenError extends BaseError {
  constructor(message: string) {
    super(message, "ForbiddenError", 403);
  }
}

class InternalServerError extends BaseError {
  constructor(message: string) {
    super(message, "InternalServerError", 500);
  }
}

export {
  BaseError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  InternalServerError,
};
