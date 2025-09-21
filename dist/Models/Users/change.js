"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.change = void 0;
const CError_1 = require("../../Utils/Errors/CError");
const zod_1 = require("zod");
const validation_1 = require("../../Utils/Errors/Zod/validation");
const zodParse_1 = require("../../Utils/Functions/zodParse");
const changeUser_1 = require("../../Services/Users/changeUser");
const validation = (0, zod_1.object)({
    senha_atual: (0, zod_1.string)(validation_1.stringRequired),
    nova_senha: (0, zod_1.string)(validation_1.stringRequired),
    confirma_senha: (0, zod_1.string)(validation_1.stringRequired),
});
const change = async (req, res) => {
    try {
        const { id } = req.params;
        const parsed = (0, zodParse_1.zodParse)(req, validation);
        const message = await (0, changeUser_1.changeUser)(Number(id), parsed.data);
        res.status(201).json({ message });
    }
    catch (error) {
        console.error(error);
        if (error instanceof CError_1.CError)
            return res.status(error.status).json(error.data);
        res.status(500).json({ message: "Internal Server error!", error });
    }
};
exports.change = change;
