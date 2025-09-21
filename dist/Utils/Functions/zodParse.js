"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zodParse = void 0;
const zodErrors_1 = require("../Errors/Zod/zodErrors");
const CError_1 = require("../Errors/CError");
const zodParse = (req, validation) => {
    const parsed = validation.safeParse(req.body);
    if (parsed.error)
        throw new CError_1.CError((0, zodErrors_1.formatZodErrors)(parsed.error), 400);
    return parsed;
};
exports.zodParse = zodParse;
