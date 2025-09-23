"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authControllers_1 = require("../Controller/authControllers");
const authRouter = (0, express_1.Router)();
authRouter.post("/auth/login", authControllers_1.authController.login);
authRouter.post("/auth/register", authControllers_1.authController.register);
authRouter.post("/auth/ativar-conta/:token", authControllers_1.authController.active);
exports.default = authRouter;
