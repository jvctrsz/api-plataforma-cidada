import { NotFoundError } from "../../Utils/Errors/CError";
import { prisma } from "../../Utils/prisma";

export const getImages = async (id: number) => {
  try {
    const request = await prisma.solicitacao.findUnique({ where: { id } });
    if (!request) throw new NotFoundError("Solicitação não encontrada.");

    const images = await prisma.imagens.findMany({
      where: { solicitacao_id: id },
    });
    return images;
  } catch (error) {
    throw error;
  }
};
