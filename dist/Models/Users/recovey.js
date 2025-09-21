"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recovery = void 0;
const CError_1 = require("../../Utils/Errors/CError");
const zod_1 = require("zod");
const validation_1 = require("../../Utils/Errors/Zod/validation");
const recoveryUsers_1 = require("../../Services/Users/recoveryUsers");
const zodParse_1 = require("../../Utils/Functions/zodParse");
const validation = (0, zod_1.object)({
    email: validation_1.email,
});
const recovery = async (req, res) => {
    try {
        const parsed = (0, zodParse_1.zodParse)(req, validation);
        const message = await (0, recoveryUsers_1.recoveryUsers)(parsed?.data);
        res.status(201).json({ message });
    }
    catch (error) {
        console.error(error);
        if (error instanceof CError_1.CError)
            return res.status(error.status).json(error.data);
        res.status(500).json({ message: "Internal Server error!", error });
    }
};
exports.recovery = recovery;
