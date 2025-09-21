"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showUsers = void 0;
const CError_1 = require("../../Utils/Errors/CError");
const prisma_1 = require("../../Utils/prisma");
const functions_1 = require("./Utils/functions");
const showUsers = async (id) => {
    try {
        const user = await prisma_1.prisma.usuarios.findUnique({
            where: { id },
            omit: functions_1.omitUser,
        });
        if (!user)
            throw new CError_1.CError({ error: "Usuário não encontrado." }, 404);
        return user;
    }
    catch (error) {
        throw error;
    }
};
exports.showUsers = showUsers;
