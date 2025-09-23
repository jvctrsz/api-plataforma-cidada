"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./Routes/userRoutes"));
const authRoutes_1 = __importDefault(require("./Routes/authRoutes"));
const port = 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api", userRoutes_1.default);
app.use("/api", authRoutes_1.default);
app.listen(port, () => {
    console.log("servidor rodando em http://localhost:3000");
});
exports.default = app;
