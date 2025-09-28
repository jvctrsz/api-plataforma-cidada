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
