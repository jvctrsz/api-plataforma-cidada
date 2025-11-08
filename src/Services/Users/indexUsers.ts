import { prisma } from "../../Utils/prisma";
import { omitUser } from "./Utils/functions";

export const indexUsers = async () => {
  try {
    const users = await prisma.usuarios.findMany({
      omit: omitUser,
      orderBy: { id: "asc" },
    });
    return users;
  } catch (error) {
    throw error;
  }
};
