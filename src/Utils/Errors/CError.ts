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
