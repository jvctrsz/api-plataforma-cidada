"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = void 0;
const zod_1 = require("zod");
const zodParse_1 = require("../../Utils/Functions/zodParse");
const CError_1 = require("../../Utils/Errors/CError");
const validation_1 = require("../../Utils/Errors/Zod/validation");
const updateUser_1 = require("../../Services/Users/updateUser");
const validation = (0, zod_1.object)({
    nome: (0, zod_1.string)(validation_1.stringRequired).optional(),
    email: (0, zod_1.email)({ error: "Deve ser um email válido." }).optional(),
    cpf: validation_1.cpf.optional(),
    celular: validation_1.celular.optional(),
    telefone: validation_1.telefone.optional(),
});
const update = async (req, res) => {
    try {
        const { id } = req.params;
        const parsed = (0, zodParse_1.zodParse)(req, validation);
        const user = await (0, updateUser_1.updateUser)(Number(id), parsed?.data);
        res.status(201).json(user);
    }
    catch (error) {
        console.error(error);
        if (error instanceof CError_1.CError)
            return res.status(error.status).json(error.data);
        res.status(500).json({ message: "Internal Server error!", error });
    }
};
exports.update = update;
