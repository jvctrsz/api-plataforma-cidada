"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authToken = void 0;
const CError_1 = require("../../Utils/Errors/CError");
const verifyToken_1 = require("../../Utils/Functions/verifyToken");
const authToken = async (req, res, next) => {
    try {
        const hash = process.env.LOGIN_JWT_SECRET;
        if (!hash)
            throw new CError_1.CError({ message: "Internal Server Error!" }, 500);
        const { authorization } = req.headers;
        if (!authorization)
            throw new CError_1.CError({ error: "Token não recebido" }, 401);
        const [, token] = authorization.split(" ");
        const decoded = await (0, verifyToken_1.verifyToken)(token, hash);
        const { id, role } = decoded;
        req.user_id = id;
        req.role = role;
        next();
    }
    catch (error) {
        if (error instanceof CError_1.CError)
            return res.status(error.status).json(error.data);
        res.status(500).json({ message: "Internal Server error!", error });
    }
};
exports.authToken = authToken;
