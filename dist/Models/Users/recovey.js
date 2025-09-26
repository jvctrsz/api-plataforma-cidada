"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recovery = void 0;
const CError_1 = require("../../Utils/Errors/CError");
const recoveryUsers_1 = require("../../Services/Users/recoveryUsers");
const zodParse_1 = require("../../Utils/Functions/zodParse");
const user_scheme_1 = require("../../Schemes/user.scheme");
const recovery = async (req, res) => {
    try {
        const parsed = (0, zodParse_1.zodParse)(req, user_scheme_1.recoveryScheme);
        const message = await (0, recoveryUsers_1.recoveryUsers)(parsed?.data);
        res.status(200).json({ message });
    }
    catch (error) {
        console.error(error);
        if (error instanceof CError_1.CError)
            return res.status(error.status).json(error.data);
        res.status(500).json({ message: "Internal Server error!", error });
    }
};
exports.recovery = recovery;
