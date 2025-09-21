"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genericError = void 0;
const genericError = (error, res) => {
    console.error(error);
    return res.status(500).json({ message: "Internal Server error!", error });
};
exports.genericError = genericError;
