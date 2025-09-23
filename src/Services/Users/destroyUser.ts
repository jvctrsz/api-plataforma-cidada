import { CError } from "../../Utils/Errors/CError";
import { prisma } from "../../Utils/prisma";
import { omitUser } from "./Utils/functions";

export const destroyUser = async (id: number) => {
  try {
    const user = await prisma.usuarios.findUnique({
      where: { id },
      omit: omitUser,
    });
    if (!user) throw new CError({ error: "Usuário não encontrado." }, 404);
    await prisma.usuarios.delete({ where: { id } });
    return "Usuário deletado com sucesso.";
  } catch (error) {
    throw error;
  }
};
