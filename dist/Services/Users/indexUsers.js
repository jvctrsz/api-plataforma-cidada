"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexUsers = void 0;
const prisma_1 = require("../../Utils/prisma");
const functions_1 = require("./Utils/functions");
const indexUsers = async () => {
    try {
        const users = await prisma_1.prisma.usuarios.findMany({
            omit: functions_1.omitUser,
        });
        return users;
    }
    catch (error) {
        throw error;
    }
};
exports.indexUsers = indexUsers;
