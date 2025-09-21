"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const CError_1 = require("../Errors/CError");
const verifyToken = async (token, hash) => {
    try {
        return (0, jsonwebtoken_1.verify)(token, hash);
    }
    catch (error) {
        throw new CError_1.CError({ error: "Não é possível continuar, token inválido." }, 422);
    }
};
exports.verifyToken = verifyToken;
