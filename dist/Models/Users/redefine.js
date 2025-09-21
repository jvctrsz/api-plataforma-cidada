"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redefine = void 0;
const CError_1 = require("../../Utils/Errors/CError");
const zodParse_1 = require("../../Utils/Functions/zodParse");
const redefineUsers_1 = require("../../Services/Users/redefineUsers");
const zod_1 = require("zod");
const validation_1 = require("../../Utils/Errors/Zod/validation");
const validation = (0, zod_1.object)({
    email: validation_1.email,
    nova_senha: (0, zod_1.string)(validation_1.stringRequired),
    confirma_senha: (0, zod_1.string)(validation_1.stringRequired),
});
const redefine = async (req, res) => {
    try {
        const { token } = req.params;
        const parsed = (0, zodParse_1.zodParse)(req, validation);
        const message = await (0, redefineUsers_1.redefineUsers)(token, parsed?.data);
        res.status(201).json({ message });
    }
    catch (error) {
        console.error(error);
        if (error instanceof CError_1.CError)
            return res.status(error.status).json(error.data);
        res.status(500).json({ message: "Internal Server error!", error });
    }
};
exports.redefine = redefine;
