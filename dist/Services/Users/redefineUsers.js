"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redefineUsers = void 0;
const CError_1 = require("../../Utils/Errors/CError");
const hashPassword_1 = require("../../Utils/Functions/hashPassword");
const prisma_1 = require("../../Utils/prisma");
const functions_1 = require("./Utils/functions");
const redefineUsers = async (token, parsed) => {
    try {
        const hash = process.env.RECOVERY_JWT_SECRET;
        const decoded = (await (0, functions_1.verifyPasswordToken)(token, hash));
        const { confirma_senha, nova_senha, email } = parsed;
        const user = await prisma_1.prisma.usuarios.findUnique({
            where: { id: Number(decoded?.id), AND: { email: { equals: email } } },
        });
        if (!user)
            throw new CError_1.CError({ error: "Usuário não encontrado." }, 404);
        if (user.redefinido_em && decoded.iat * 1000 < user.redefinido_em.getTime())
            throw new CError_1.CError({ error: "Não foi possível continuar, token inválido." }, 410);
        if (confirma_senha !== nova_senha)
            throw new CError_1.CError({ error: "Nova senha e confirma senha não coincidem." }, 400);
        const hashNewPassoword = await (0, hashPassword_1.hashPassword)(nova_senha);
        await prisma_1.prisma.usuarios.update({
            where: { id: user?.id },
            data: {
                senha: hashNewPassoword,
                redefinido_em: new Date(),
            },
        });
        return "Senha alterada com sucesso.";
    }
    catch (error) {
        throw error;
    }
};
exports.redefineUsers = redefineUsers;
