"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.show = void 0;
const CError_1 = require("../../Utils/Errors/CError");
const showUsers_1 = require("../../Services/Users/showUsers");
const show = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await (0, showUsers_1.showUsers)(Number(id));
        res.status(200).json(user);
    }
    catch (error) {
        console.error(error);
        if (error instanceof CError_1.CError)
            return res.status(error.status).json(error.data);
        res.status(500).json({ message: "Internal Server error!", error });
    }
};
exports.show = show;
