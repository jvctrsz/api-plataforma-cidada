"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CError = void 0;
class CError extends Error {
    constructor(data, status) {
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
exports.CError = CError;
