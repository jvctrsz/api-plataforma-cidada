"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
const zod_1 = require("zod");
const zodParse_1 = require("../../Utils/Functions/zodParse");
const CError_1 = require("../../Utils/Errors/CError");
const validation_1 = require("../../Utils/Errors/Zod/validation");
const createUser_1 = require("../../Services/Users/createUser");
const validation = (0, zod_1.object)({
    nome: (0, zod_1.string)(validation_1.stringRequired),
    email: (0, zod_1.email)({ error: "Deve ser um email válido." }),
    cpf: validation_1.cpf,
    celular: validation_1.celular,
    telefone: validation_1.telefone.optional(),
    senha: (0, zod_1.string)(validation_1.stringRequired),
});
const store = async (req, res) => {
    try {
        const parsed = (0, zodParse_1.zodParse)(req, validation);
        const user = await (0, createUser_1.createUser)(parsed?.data);
        res.status(201).json(user);
    }
    catch (error) {
        console.error(error);
        if (error instanceof CError_1.CError)
            return res.status(error.status).json(error.data);
        res.status(500).json({ message: "Internal Server error!", error });
    }
};
exports.store = store;
