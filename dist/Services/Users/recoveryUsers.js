"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recoveryUsers = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const prisma_1 = require("../../Utils/prisma");
const CError_1 = require("../../Utils/Errors/CError");
const redefineHTML_1 = require("./Utils/redefineHTML");
const transporter_1 = require("../../Utils/Functions/transporter");
const recoveryUsers = async (parsed) => {
    try {
        const SECRET_HASH = process.env.RECOVERY_JWT_SECRET;
        const { email } = parsed;
        const user = await prisma_1.prisma.usuarios.findUnique({ where: { email } });
        if (!user)
            throw new CError_1.CError({ error: "Usuário não encontrado." }, 404);
        const token = (0, jsonwebtoken_1.sign)({ id: user?.id }, SECRET_HASH, { expiresIn: "10m" });
        const transporter = (0, transporter_1.createTransporter)();
        const html = (0, redefineHTML_1.redefineAndLoginHTML)(user.nome, token, "redefinir");
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
