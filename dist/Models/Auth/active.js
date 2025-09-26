"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.active = void 0;
const CError_1 = require("../../Utils/Errors/CError");
const verifyToken_1 = require("../../Utils/Functions/verifyToken");
const authActive_1 = require("../../Services/Auth/authActive");
const active = async (req, res) => {
    try {
        const hash = process.env.LOGIN_JWT_SECRET;
        const { token } = req.params;
        const decoded = await (0, verifyToken_1.verifyToken)(token, hash);
        const { id } = decoded;
        const message = await (0, authActive_1.authActive)(id);
        res.status(200).json({ message });
    }
    catch (error) {
        console.error(error);
        if (error instanceof CError_1.CError)
            return res.status(error.status).json(error.data);
        res.status(500).json({ message: "Internal Server error!", error });
    }
};
exports.active = active;
