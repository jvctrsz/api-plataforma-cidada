"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendLoginActivation = exports.createTransporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const createTransporter = () => {
    try {
        return nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    }
    catch (error) {
        throw error;
    }
};
exports.createTransporter = createTransporter;
const sendLoginActivation = (email, html) => ({
    to: email,
    from: process.env.EMAIL_USER,
    subject: "Ativação de Conta",
    html,
});
exports.sendLoginActivation = sendLoginActivation;
