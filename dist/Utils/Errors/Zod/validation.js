"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.email = exports.cpf = exports.telefone = exports.celular = exports.stringRequired = void 0;
const zod_1 = require("zod");
exports.stringRequired = { error: "deve ser uma string." };
exports.celular = (0, zod_1.string)(exports.stringRequired).regex(/^\(\d{2}\) \d{5}-\d{4}$/, {
    error: "deve ser no formato (99) 99999-9999.",
});
exports.telefone = (0, zod_1.string)(exports.stringRequired).regex(/^\(\d{2}\) \d{4}-\d{4}$/, {
    error: "deve ser no formato (99) 9999-9999.",
});
exports.cpf = (0, zod_1.string)(exports.stringRequired).regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
    error: "deve ser no formato 000.000.000-00.",
});
exports.email = (0, zod_1.email)({ error: "Deve ser um email válido." });
