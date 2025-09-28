import { NotFoundError } from "../../Utils/Errors/CError";
import { prisma } from "../../Utils/prisma";

export const showRequests = async (id: number) => {
  try {
    const request = await prisma.solicitacao.findUnique({ where: { id } });
    if (!request) throw new NotFoundError("Solicitação não encontrada.");
    return request;
  } catch (error) {
    throw error;
  }
};
