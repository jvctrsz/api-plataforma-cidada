export class CError<T = any> extends Error {
  data: T;
  status: number;

  constructor(data: T, status: number) {
    super("CustomError");
    this.name = "JsonError";
    this.data = data;
    this.status = status;
    Object.setPrototypeOf(this, CError.prototype);
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      data: this.data,
      status: this.status,
    };
  }
}

export class NotFoundError extends Error {
  message: string;
  status: number;
  data: { error: string };
  constructor(message: string) {
    super("Not Found");
    this.status = 404;
    this.message = message;
    this.data = { error: message };
    Object.setPrototypeOf(this, CError.prototype);
  }
}

export class ConflictError extends Error {
  message: string;
  status: number;
  data: { error: string };
  constructor(message: string) {
    super("Conflict Error");
    this.status = 409;
    this.message = message;
    this.data = { error: message };
    Object.setPrototypeOf(this, CError.prototype);
  }
}

export class ForbiddenError extends Error {
  message: string;
  status: number;
  data: { error: string };
  constructor(message: string) {
    super("Forbidden Error");
    this.status = 403;
    this.message = message;
    this.data = { error: message };
    Object.setPrototypeOf(this, CError.prototype);
  }
}

export class BadRequestError extends Error {
  message: string;
  status: number;
  data: { error: string };
  constructor(message: string) {
    super("BadRequest Error");
    this.status = 404;
    this.message = message;
    this.data = { error: message };
    Object.setPrototypeOf(this, CError.prototype);
  }
}

export class UnauthorizedError extends Error {
  message: string;
  status: number;
  data: { error: string };
  constructor(message: string) {
    super("Unauthorized Error");
    this.status = 401;
    this.message = message;
    this.data = { error: message };
    Object.setPrototypeOf(this, CError.prototype);
  }
}

export class ServerError extends Error {
  message: string;
  status: number;
  data: { message: string };
  constructor(message: string) {
    super("Server Error");
    this.status = 500;
    this.message = message;
    this.data = { message };
    Object.setPrototypeOf(this, CError.prototype);
  }
}
