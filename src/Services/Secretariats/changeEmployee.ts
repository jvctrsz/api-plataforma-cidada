import { ConflictError, NotFoundError } from "../../Utils/Errors/CError";
import { prisma } from "../../Utils/prisma";

export const changeEmployee = async (
  id: number,
  parsed: { secretario_id: string }
) => {
  try {
    const secretariat = await prisma.secretaria.findUnique({ where: { id } });
    if (!secretariat) throw new NotFoundError("Secretaria não encontrada.");

    const { secretario_id } = parsed;
    const user = await prisma.usuarios.findUnique({
      where: { id: Number(secretario_id) },
    });
    if (!user) throw new NotFoundError("Usuário não encontrado.");

    const employeeHasSecretary = await prisma.secretaria.findUnique({
      where: { secretario_id: Number(secretario_id) },
    });
    if (!!employeeHasSecretary)
      throw new ConflictError("Secretario já vinculado a uma secretaria.");

    await prisma.secretaria.update({
      where: { id },
      data: {
        secretario_id: Number(secretario_id),
      },
    });

    return "Secretario alterado com sucesso.";
  } catch (error) {
    throw error;
  }
};
