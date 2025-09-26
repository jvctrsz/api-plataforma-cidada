"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authActive = void 0;
const CError_1 = require("../../Utils/Errors/CError");
const prisma_1 = require("../../Utils/prisma");
const authActive = async (id) => {
    try {
        const user = await prisma_1.prisma.usuarios.findUnique({ where: { id } });
        if (!user)
            throw new CError_1.CError({ error: "Usuário não encontrado" }, 404);
        await prisma_1.prisma.usuarios.update({
            where: { id: user?.id },
            data: {
                valido: true,
            },
        });
        return "Usuário ativado com sucesso.";
    }
    catch (error) {
        throw error;
    }
};
exports.authActive = authActive;
