"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroy = void 0;
const CError_1 = require("../../Utils/Errors/CError");
const destroyUser_1 = require("../../Services/Users/destroyUser");
const destroy = async (req, res) => {
    try {
        const { id } = req.params;
        const message = await (0, destroyUser_1.destroyUser)(Number(id));
        res.status(201).json({ message });
    }
    catch (error) {
        console.error(error);
        if (error instanceof CError_1.CError) {
            res.status(error.status).json(error.data);
        }
        res.status(500).json({ message: "Internal Server Error!", error });
    }
};
exports.destroy = destroy;
