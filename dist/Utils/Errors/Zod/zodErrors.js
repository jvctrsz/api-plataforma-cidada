"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatZodErrors = void 0;
const formatZodErrors = (error) => error?.issues.map((err) => {
    const field = err.path.length > 0 ? err.path.join(".") : "global";
    return { [field]: err.message };
});
exports.formatZodErrors = formatZodErrors;
