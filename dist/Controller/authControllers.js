"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const active_1 = require("../Models/Auth/active");
const login_1 = require("../Models/Auth/login");
const register_1 = require("../Models/Auth/register");
exports.authController = {
    login: login_1.login,
    register: register_1.register,
    active: active_1.active,
};
