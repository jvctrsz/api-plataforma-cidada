"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRegister = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const transporter_1 = require("../../Utils/Functions/transporter");
const authRegister = async (user) => {
    try {
        const hash = process.env.LOGIN_JWT_SECRET;
        console.log("user_id", user.id);
        const token = (0, jsonwebtoken_1.sign)({ id: user.id }, hash, { expiresIn: "1d" });
        console.log("token", token);
        const transporter = (0, transporter_1.createTransporter)();
        await transporter.sendMail({
            to: user.email,
            from: process.env.EMAIL_USER,
            subject: "Validação de Conta",
            text: token,
        });
        return "Usuário criado - email de confirmação enviado.";
    }
    catch (error) {
        throw error;
    }
};
exports.authRegister = authRegister;
