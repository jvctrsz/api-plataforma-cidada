"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeUser = void 0;
const CError_1 = require("../../Utils/Errors/CError");
const hashPassword_1 = require("../../Utils/Functions/hashPassword");
const prisma_1 = require("../../Utils/prisma");
const argon2_1 = __importDefault(require("argon2"));
const changeUser = async (id, parsed) => {
    try {
        const user = await prisma_1.prisma.usuarios.findUnique({ where: { id } });
        if (!user)
            throw new CError_1.CError({ error: "Usuário não encontrado." }, 404);
        if (!!user.google_id)
            throw new CError_1.CError({ error: "Usuário cadastrado através da autenticação com google." }, 403);
        const { confirma_senha, nova_senha, senha_atual } = parsed;
        const isEqual = await argon2_1.default.verify(user.senha, senha_atual);
        if (!isEqual)
            throw new CError_1.CError({ senha_atual: "A senha atual inserida é incorreta." }, 400);
        if (confirma_senha !== nova_senha)
            throw new CError_1.CError({ error: "Nova senha e confirma senha não coincidem." }, 400);
        const hashNewPassoword = await (0, hashPassword_1.hashPassword)(nova_senha);
        await prisma_1.prisma.usuarios.update({
            where: { id },
            data: {
                senha: hashNewPassoword,
            },
        });
        return "Senha alterada com sucesso.";
    }
    catch (error) {
        throw error;
    }
};
exports.changeUser = changeUser;
