import { CError, NotFoundError } from "../../Utils/Errors/CError";
import { prisma } from "../../Utils/prisma";

export const authActive = async (id: number) => {
  try {
    const user = await prisma.usuarios.findUnique({ where: { id } });
    if (!user) throw new NotFoundError("Usuário não encontrado");

    await prisma.usuarios.update({
      where: { id: user?.id },
      data: {
        valido: true,
      },
    });
    return "Usuário ativado com sucesso.";
  } catch (error) {
    throw error;
  }
};
