import { RequestsTypes } from "../../Controller/types";
import { ConflictError, NotFoundError } from "../../Utils/Errors/CError";
import { prisma } from "../../Utils/prisma";

export const statusRequest = async (
  id: number,
  parsed: Partial<RequestsTypes>
) => {
  try {
    const request = await prisma.solicitacao.findUnique({ where: { id } });
    if (!request) throw new NotFoundError("Solicitação não encontrada.");

    const { status } = parsed;
    if (request.status === status)
      throw new ConflictError(`A Solicitação já está com o status: ${status}.`);

    await prisma.solicitacao.update({
      where: { id },
      data: {
        status,
        atualizado_em: new Date(),
      },
    });
    return "Status alterado com sucesso.";
  } catch (error) {
    throw error;
  }
};
