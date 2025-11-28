import { UserRole } from "../../Controller/types";
import { ConflictError, NotFoundError } from "../../Utils/Errors/CError";
import { prisma } from "../../Utils/prisma";

export const roleUser = async (id: number, parsed: { role: UserRole }) => {
  try {
    const user = await prisma.usuarios.findUnique({ where: { id } });
    if (!user) throw new NotFoundError("Usuário não encontrado.");

    const { role } = parsed;
    if (role === user.role)
      throw new ConflictError(`O usuário já está com a permissão de: ${role}.`);

    await prisma.usuarios.update({
      where: { id },
      data: {
        role,
      },
    });

    return "Permissão alterada com sucesso.";
  } catch (error) {
    throw error;
  }
};
