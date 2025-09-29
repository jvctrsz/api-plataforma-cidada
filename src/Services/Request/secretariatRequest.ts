import { RequestFields } from "../../Controller/types";
import { ConflictError, NotFoundError } from "../../Utils/Errors/CError";
import { prisma } from "../../Utils/prisma";

export const secretariatRequest = async (
  id: number,
  parsed: Partial<RequestFields>
) => {
  try {
    const request = await prisma.solicitacao.findUnique({ where: { id } });
    if (!request) throw new NotFoundError("Solicitação não encontrada.");

    const { secretaria_id } = parsed;
    if (request.secretaria_id === Number(secretaria_id))
      throw new ConflictError("A Solicitação já pertence a esta secretaria.");

    const secretariat = await prisma.secretaria.findUnique({
      where: { id: Number(secretaria_id) },
    });
    if (!secretariat) throw new NotFoundError("Secretaria não encontrada.");
    if (!secretariat.ativo) throw new ConflictError("Secretaria esta inativa.");

    await prisma.solicitacao.update({
      where: { id },
      data: {
        secretaria_id: Number(secretaria_id),
        atualizado_em: new Date(),
      },
    });
    return "Solicitação transferida com sucesso.";
  } catch (error) {
    throw error;
  }
};
