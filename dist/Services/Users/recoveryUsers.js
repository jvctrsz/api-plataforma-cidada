"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recoveryUsers = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const prisma_1 = require("../../Utils/prisma");
const CError_1 = require("../../Utils/Errors/CError");
const nodemailer_1 = __importDefault(require("nodemailer"));
const redefineHTML_1 = require("./Utils/redefineHTML");
const recoveryUsers = async (parsed) => {
    try {
        const SECRET_HASH = process.env.RECOVERY_JWT_SECRET;
        const { email } = parsed;
        const user = await prisma_1.prisma.usuarios.findUnique({ where: { email } });
        if (!user)
            throw new CError_1.CError({ error: "Usuário não encontrado." }, 404);
        const token = (0, jsonwebtoken_1.sign)({ id: user?.id }, SECRET_HASH, { expiresIn: "10m" });
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        const html = (0, redefineHTML_1.redefineHTML)(user.nome, token);
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Recuperação de senha",
            html,
        });
        return "Link de recuperação enviado com sucesso.";
    }
    catch (error) {
        throw error;
    }
};
exports.recoveryUsers = recoveryUsers;
