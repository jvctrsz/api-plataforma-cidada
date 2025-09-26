"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.email = exports.cpf = exports.telefone = exports.celular = exports.stringRequired = void 0;
const zod_to_openapi_1 = require("@asteasolutions/zod-to-openapi");
const zod_1 = __importDefault(require("zod"));
const isValidCpf_1 = require("../../Functions/isValidCpf");
(0, zod_to_openapi_1.extendZodWithOpenApi)(zod_1.default);
exports.stringRequired = { error: "deve ser uma string." };
exports.celular = zod_1.default
    .string(exports.stringRequired)
    .regex(/^\(\d{2}\) \d{5}-\d{4}$/, {
    error: "deve ser no formato (99) 99999-9999.",
});
exports.telefone = zod_1.default
    .string(exports.stringRequired)
    .regex(/^\(\d{2}\) \d{4}-\d{4}$/, {
    error: "deve ser no formato (99) 9999-9999.",
});
exports.cpf = zod_1.default
    .string(exports.stringRequired)
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
    error: "deve ser no formato 000.000.000-00.",
})
    .refine(isValidCpf_1.isValidCpf, "deve ser um cpf válido.");
exports.email = zod_1.default
    .email({ error: "deve ser um email válido." })
    .max(150, "deve ter no máximo 150 caracteres.")
    .openapi({ example: "teste@gmail.com" });
