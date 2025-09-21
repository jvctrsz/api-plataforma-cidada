"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = void 0;
const CError_1 = require("../../Utils/Errors/CError");
const prisma_1 = require("../../Utils/prisma");
const functions_1 = require("./Utils/functions");
const updateUser = async (id, parsed) => {
    try {
        const user = await prisma_1.prisma.usuarios.findUnique({ where: { id } });
        if (!user)
            throw new CError_1.CError({ error: "Usuário não encontrado." }, 404);
        const { celular, cpf, email, nome, telefone } = parsed;
        const existingEmail = await prisma_1.prisma.usuarios.findUnique({
            where: { email, AND: { id: { not: id } } },
        });
        if (!!existingEmail)
            throw new CError_1.CError({ error: "Já existe usuário com este email." }, 409);
        const existingCPF = await prisma_1.prisma.usuarios.findUnique({
            where: { cpf, AND: { id: { not: id } } },
        });
        if (!!existingCPF)
            throw new CError_1.CError({ error: "Já existe usuário com este cpf." }, 409);
        console.log(cpf?.length);
        const update = prisma_1.prisma.usuarios.update({
            where: { id },
            data: {
                celular,
                cpf,
                email,
                nome,
                telefone,
            },
            omit: functions_1.omitUser,
        });
        return update;
    }
    catch (error) {
        throw error;
    }
};
exports.updateUser = updateUser;
