"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.change = void 0;
const CError_1 = require("../../Utils/Errors/CError");
const zodParse_1 = require("../../Utils/Functions/zodParse");
const changeUser_1 = require("../../Services/Users/changeUser");
const user_scheme_1 = require("../../Schemes/user.scheme");
const change = async (req, res) => {
    try {
        const id = req.user_id;
        const parsed = (0, zodParse_1.zodParse)(req, user_scheme_1.changeScheme);
        const message = await (0, changeUser_1.changeUser)(Number(id), parsed.data);
        res.status(200).json({ message });
    }
    catch (error) {
        console.error(error);
        if (error instanceof CError_1.CError)
            return res.status(error.status).json(error.data);
        res.status(500).json({ message: "Internal Server error!", error });
    }
};
exports.change = change;
