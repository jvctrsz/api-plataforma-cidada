import { UserRole } from "../../Controller/types";
import { NotFoundError } from "../../Utils/Errors/CError";
import { prisma } from "../../Utils/prisma";
import { canHandleMessage } from "./Utils/canHandleMessage";

export const messagesRequests = async (
  id: number,
  user_id: number,
  role: UserRole
) => {
  try {
    const request = await prisma.solicitacao.findUnique({ where: { id } });
    if (!request) throw new NotFoundError("Solicitação não encontrada.");
    const user = await prisma.usuarios.findUnique({ where: { id: user_id } });
    if (!user) throw new NotFoundError("Usuário não encontrado.");

    canHandleMessage(
      request.funcionario_id,
      request.usuarios_id,
      user_id,
      role
    );

    const messages = prisma.mensagens.findMany({
      where: { solicitacao_id: id },
    });
    return messages;
  } catch (error) {
    throw error;
  }
};
