"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
const zodParse_1 = require("../../Utils/Functions/zodParse");
const CError_1 = require("../../Utils/Errors/CError");
const createUser_1 = require("../../Services/Users/createUser");
const user_scheme_1 = require("../../Schemes/user.scheme");
const store = async (req, res) => {
    try {
        const parsed = (0, zodParse_1.zodParse)(req, user_scheme_1.postUserScheme);
        const user = await (0, createUser_1.createUser)(parsed?.data);
        res.status(201).json(user);
    }
    catch (error) {
        console.error(error);
        if (error instanceof CError_1.CError)
            return res.status(error.status).json(error.data);
        res.status(500).json({ message: "Internal Server error!", error });
    }
};
exports.store = store;
