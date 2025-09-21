"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = void 0;
const CError_1 = require("../../Utils/Errors/CError");
const indexUsers_1 = require("../../Services/Users/indexUsers");
const index = async (req, res) => {
    try {
        const users = await (0, indexUsers_1.indexUsers)();
        res.status(200).json(users);
    }
    catch (error) {
        console.error(error);
        if (error instanceof CError_1.CError)
            return res.status(error.status).json(error.data);
        res.status(500).json({ message: "Internal Server error!", error });
    }
};
exports.index = index;
