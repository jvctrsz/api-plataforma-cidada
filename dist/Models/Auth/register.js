"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const store_1 = require("../Users/store");
const zodParse_1 = require("../../Utils/Functions/zodParse");
const CError_1 = require("../../Utils/Errors/CError");
const createUser_1 = require("../../Services/Users/createUser");
const authRegister_1 = require("../../Services/Auth/authRegister");
const register = async (req, res) => {
    try {
        const parsed = (0, zodParse_1.zodParse)(req, store_1.postUserScheme);
        const user = await (0, createUser_1.createUser)(parsed?.data);
        console.log("user", user);
        const message = await (0, authRegister_1.authRegister)(user);
        res.status(201).json({ message });
    }
    catch (error) {
        console.error(error);
        if (error instanceof CError_1.CError)
            return res.status(error.status).json(error.data);
        res.status(500).json({ message: "Internal Server error!", error });
    }
};
exports.register = register;
