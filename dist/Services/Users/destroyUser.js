"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroyUser = void 0;
const CError_1 = require("../../Utils/Errors/CError");
const prisma_1 = require("../../Utils/prisma");
const functions_1 = require("./Utils/functions");
const destroyUser = async (id) => {
    try {
        const user = await prisma_1.prisma.usuarios.findUnique({
            where: { id },
            omit: functions_1.omitUser,
        });
        if (!user)
            throw new CError_1.CError({ error: "Usuário não encontrado." }, 404);
        return "Usuário deletado com sucesso.";
    }
    catch (error) {
        throw error;
    }
};
exports.destroyUser = destroyUser;
