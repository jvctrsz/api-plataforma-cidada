import { NotFoundError } from "../../Utils/Errors/CError";
import { prisma } from "../../Utils/prisma";
import { omitUser } from "./Utils/functions";

export const showUsers = async (id: number) => {
  try {
    const user = await prisma.usuarios.findUnique({
      where: { id },
      omit: omitUser,
    });
    if (!user) throw new NotFoundError("Usuário não encontrado.");
    return user;
  } catch (error) {
    throw error;
  }
};
