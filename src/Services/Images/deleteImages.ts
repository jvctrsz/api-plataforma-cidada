import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from "../../Utils/Errors/CError";
import { prisma } from "../../Utils/prisma";
import { removeFromCloudinary } from "./Utils/functions";

export const deleteImages = async (id: number, parsed: { ids: string[] }) => {
  try {
    const request = await prisma.solicitacao.findUnique({ where: { id } });
    if (!request) throw new NotFoundError("Solicitação não encontrada.");

    const images = await prisma.imagens.findMany({
      where: { solicitacao_id: id },
    });
    if (!images.length)
      throw new ConflictError("Não há nenhuma imagem nesta solicitação.");

    const { ids } = parsed;

    const existingIds = images.some(({ public_id }) => ids.includes(public_id));
    if (!existingIds) throw new BadRequestError("Nenhum ID válido enviado.");

    const validIds = ids.filter((id) =>
      images.some(({ public_id }) => public_id == id)
    );

    await removeFromCloudinary(validIds);
    await prisma.imagens.deleteMany({ where: { public_id: { in: validIds } } });

    return "Imagens deletadas com sucesso.";
  } catch (error) {
    throw error;
  }
};
