import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from "../../Utils/Errors/CError";
import { prisma } from "../../Utils/prisma";
import cloudinary, { CloudFiles } from "./config";

export const storeImages = async (id: number, files: CloudFiles[]) => {
  try {
    const request = await prisma.solicitacao.findUnique({ where: { id } });
    if (!request) throw new NotFoundError("Solicitação não encontrada.");

    const countImages = await prisma.imagens.count({
      where: { solicitacao_id: id },
    });
    if (countImages + files.length > 5)
      throw new ConflictError("Limite de 5 imagens atingido.");

    const uploads = await Promise.all(
      files.map((file) =>
        cloudinary.uploader.upload(file.path, {
          folder: "solicitacoes",
        })
      )
    );
    const images = uploads.map((upload) => ({
      url: upload.secure_url,
      public_id: upload.public_id,
      solicitacao_id: id,
    }));

    await prisma.imagens.createMany({ data: images });
    return "Imagens salvas com sucesso.";
  } catch (error) {
    throw error;
  }
};
