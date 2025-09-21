"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authControllers_1 = require("../Controller/authControllers");
const authRoutes = (0, express_1.Router)();
authRoutes.post("/auth/login", authControllers_1.authController.login);
