"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPasswordToken = exports.omitUser = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const CError_1 = require("../../../Utils/Errors/CError");
exports.omitUser = {
    google_id: true,
    refreshPasswordTime: true,
    refreshPasswordToken: true,
    senha: true,
};
const verifyPasswordToken = async (token, hash) => {
    try {
        return (0, jsonwebtoken_1.verify)(token, hash);
    }
    catch (error) {
        throw new CError_1.CError({ error: "Não é possível continuar, token expirado." }, 422);
    }
};
exports.verifyPasswordToken = verifyPasswordToken;
