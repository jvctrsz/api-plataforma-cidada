"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRegister = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const transporter_1 = require("../../Utils/Functions/transporter");
const redefineHTML_1 = require("../Users/Utils/redefineHTML");
const authRegister = async (user) => {
    try {
        const hash = process.env.LOGIN_JWT_SECRET;
        const token = (0, jsonwebtoken_1.sign)({ id: user.id }, hash, { expiresIn: "1d" });
        const html = (0, redefineHTML_1.redefineAndLoginHTML)(user.nome, token, "ativar");
        const transporter = (0, transporter_1.createTransporter)();
        await transporter.sendMail((0, transporter_1.sendLoginActivation)(user.email, html));
        return "Usuário criado - email de confirmação enviado.";
    }
    catch (error) {
        throw error;
    }
};
exports.authRegister = authRegister;
