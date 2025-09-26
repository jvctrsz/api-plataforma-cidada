"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redefine = void 0;
const CError_1 = require("../../Utils/Errors/CError");
const zodParse_1 = require("../../Utils/Functions/zodParse");
const redefineUsers_1 = require("../../Services/Users/redefineUsers");
const user_scheme_1 = require("../../Schemes/user.scheme");
const redefine = async (req, res) => {
    try {
        const { token } = req.params;
        const parsed = (0, zodParse_1.zodParse)(req, user_scheme_1.redefineScheme);
        const message = await (0, redefineUsers_1.redefineUsers)(token, parsed?.data);
        res.status(200).json({ message });
    }
    catch (error) {
        console.error(error);
        if (error instanceof CError_1.CError)
            return res.status(error.status).json(error.data);
        res.status(500).json({ message: "Internal Server error!", error });
    }
};
exports.redefine = redefine;
