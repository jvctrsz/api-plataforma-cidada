import { CError } from "../../Utils/Errors/CError";
import { prisma } from "../../Utils/prisma";

export const showRequests = async (id: number) => {
  try {
    const request = await prisma.solicitacao.findUnique({ where: { id } });
    if (!request)
      throw new CError({ error: "Solicitação não encontrada." }, 404);
    return request;
  } catch (error) {
    throw error;
  }
};
