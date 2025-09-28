import { NotFoundError } from "../../Utils/Errors/CError";
import { prisma } from "../../Utils/prisma";

export const dataUser = async (id: number) => {
  try {
    const user = await prisma.usuarios.findUnique({
      where: { id },
      omit: {
        senha: true,
        redefinido_em: true,
        valido: true,
      },
    });
    if (!user) throw new NotFoundError("Usuário não encontrado");
    return user;
  } catch (error) {
    throw error;
  }
};
