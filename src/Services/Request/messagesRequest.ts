import { UserRole } from "../../Controller/types";
import { ForbiddenError, NotFoundError } from "../../Utils/Errors/CError";
import { prisma } from "../../Utils/prisma";

export const messagesRequests = async (
  id: number,
  user_id: number,
  role: UserRole
) => {
  try {
    const request = await prisma.solicitacao.findUnique({ where: { id } });
    if (!request) throw new NotFoundError("Solicitação não encontrada.");

    const messages = prisma.mensagens.findMany({
      where: { solicitacao_id: id },
    });
    return messages;
  } catch (error) {
    throw error;
  }
};
