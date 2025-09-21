"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const CError_1 = require("../../Utils/Errors/CError");
const zod_1 = require("zod");
const validation_1 = require("../../Utils/Errors/Zod/validation");
const zodParse_1 = require("../../Utils/Functions/zodParse");
const authLogin_1 = require("../../Services/Auth/authLogin");
const validation = (0, zod_1.object)({
    email: validation_1.email,
    senha: (0, zod_1.string)(validation_1.stringRequired),
});
const login = async (req, res) => {
    try {
        const parsed = (0, zodParse_1.zodParse)(req, validation);
        const token = await (0, authLogin_1.authLogin)(parsed?.data);
        res.status(200).json({ token });
    }
    catch (error) {
        console.error(error);
        if (error instanceof CError_1.CError)
            return res.status(error.status).json(error.data);
        res.status(500).json({ message: "Internal Server error!", error });
    }
};
exports.login = login;
