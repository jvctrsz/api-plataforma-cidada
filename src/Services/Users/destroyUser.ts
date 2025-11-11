import { ConflictError, NotFoundError } from "../../Utils/Errors/CError";
import { prisma } from "../../Utils/prisma";
import { omitUser } from "./Utils/functions";

export const destroyUser = async (id: number) => {
  try {
    const user = await prisma.usuarios.findUnique({
      where: { id },
      omit: omitUser,
    });
    if (!user) throw new NotFoundError("Usuário não encontrado.");
    const secretary = await prisma.secretaria.findUnique({
      where: { secretario_id: id },
    });
    if (!!secretary)
      throw new ConflictError(
        "Esse usuário esta vinculado a uma secretaria, não é possível deletá-lo."
      );

    await prisma.usuarios.delete({ where: { id } });
    return "Usuário deletado com sucesso.";
  } catch (error) {
    throw error;
  }
};
