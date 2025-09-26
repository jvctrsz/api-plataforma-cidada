"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authLogin = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const CError_1 = require("../../Utils/Errors/CError");
const prisma_1 = require("../../Utils/prisma");
const argon2_1 = __importDefault(require("argon2"));
const date_fns_1 = require("date-fns");
const transporter_1 = require("../../Utils/Functions/transporter");
const redefineHTML_1 = require("../Users/Utils/redefineHTML");
const defaultError = { error: "As credenciais informadas estão incorretas." };
const authLogin = async (parsed) => {
    try {
        const hash = process.env.LOGIN_JWT_SECRET;
        if (!hash)
            throw new CError_1.CError({ message: "Internal Server Error!" }, 500);
        const { email, senha } = parsed;
        const user = await prisma_1.prisma.usuarios.findUnique({ where: { email } });
        if (!user)
            throw new CError_1.CError(defaultError, 400);
        if (!!user.google_id)
            throw new CError_1.CError({ error: "Usuário cadastrado através do google." }, 403);
        if (!user.valido) {
            if (!(0, date_fns_1.isSameDay)(user.criado_em, new Date())) {
                const token = (0, jsonwebtoken_1.sign)({ id: user.id }, hash, { expiresIn: "1d" });
                const html = (0, redefineHTML_1.redefineAndLoginHTML)(user.nome, token, "ativar");
                const transporter = (0, transporter_1.createTransporter)();
                await transporter.sendMail((0, transporter_1.sendLoginActivation)(user.email, html));
            }
            throw new CError_1.CError({
                error: "Usuário aguardando validação - verificar caixa de email.",
            }, 403);
        }
        const isEqual = await argon2_1.default.verify(user.senha, senha);
        if (!isEqual)
            throw new CError_1.CError(defaultError, 400);
        const token = (0, jsonwebtoken_1.sign)({ id: user.id, role: user.role }, hash, {
            expiresIn: "1d",
        });
        return token;
    }
    catch (error) {
        throw error;
    }
};
exports.authLogin = authLogin;
