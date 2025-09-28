import { NotFoundError } from "../../Utils/Errors/CError";
import { prisma } from "../../Utils/prisma";

export const destroyRequest = async (id: number) => {
  try {
    const request = await prisma.solicitacao.findUnique({ where: { id } });
    if (!request) throw new NotFoundError("Solicitação não encontrada.");
    await prisma.solicitacao.delete({ where: { id } });
    return "Solicitação deletada com sucesso.";
  } catch (error) {
    throw error;
  }
};
