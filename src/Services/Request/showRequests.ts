import { UserRole } from "../../Controller/types";
import { NotFoundError } from "../../Utils/Errors/CError";
import { prisma } from "../../Utils/prisma";

export const showRequests = async (
  id: number,
  user_id: number,
  role: UserRole
) => {
  try {
    const requestQuery = () => {
      if (role === "usuario") return { usuarios_id: user_id };
      if (role === "funcionario") return { funcionario_id: user_id };
    };
    const request = await prisma.solicitacao.findUnique({
      where: { id, ...requestQuery() },
      include: {
        categoria: true,
      },
    });
    if (!request) throw new NotFoundError("Solicitação não encontrada.");
    return request;
  } catch (error) {
    throw error;
  }
};
