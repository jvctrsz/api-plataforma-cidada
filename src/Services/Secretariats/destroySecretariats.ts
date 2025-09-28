import { ConflictError, NotFoundError } from "../../Utils/Errors/CError";
import { prisma } from "../../Utils/prisma";

export const destroySecretariats = async (id: number) => {
  try {
    const secretariat = await prisma.secretaria.findUnique({ where: { id } });
    if (!secretariat) throw new NotFoundError("Secretaria não encontrada.");
    const solicitations = await prisma.solicitacao.findFirst({
      where: { secretaria_id: { equals: id } },
    });
    if (!!solicitations)
      throw new ConflictError(
        "Esta secretaria esta vinculada a solicitações, não é possível deletar."
      );

    await prisma.secretaria.delete({ where: { id } });
    return "Secretaria deletada com sucesso.";
  } catch (error) {
    throw error;
  }
};
