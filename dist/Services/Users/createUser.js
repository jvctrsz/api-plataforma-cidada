"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const CError_1 = require("../../Utils/Errors/CError");
const hashPassword_1 = require("../../Utils/Functions/hashPassword");
const prisma_1 = require("../../Utils/prisma");
const createUser = async (parsed) => {
    try {
        const { email, senha, celular, cpf, nome, telefone } = parsed;
        const existingEmail = await prisma_1.prisma.usuarios.findUnique({
            where: { email: email },
        });
        if (!!existingEmail)
            throw new CError_1.CError({ error: "Já existe usuário com este email." }, 409);
        const existingCPF = await prisma_1.prisma.usuarios.findUnique({
            where: { cpf: cpf },
        });
        if (!!existingCPF)
            throw new CError_1.CError({ error: "Já existe usuário com este cpf." }, 409);
        const hash = await (0, hashPassword_1.hashPassword)(senha);
        const user = await prisma_1.prisma.usuarios.create({
            data: {
                celular,
                cpf,
                email,
                nome,
                telefone,
                senha: hash,
            },
            select: {
                celular: true,
                cpf: true,
                email: true,
                nome: true,
                telefone: true,
            },
        });
        return user;
    }
    catch (error) {
        throw error;
    }
};
exports.createUser = createUser;
