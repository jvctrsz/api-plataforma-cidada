import { ConflictError, NotFoundError } from "../../Utils/Errors/CError";
import { prisma } from "../../Utils/prisma";

export const destroyCategories = async (id: number) => {
  try {
    const category = await prisma.categorias.findUnique({
      where: { id },
      include: { solicitacao: true },
    });
    if (!category) throw new NotFoundError("Categoria não encontrada.");
    const openRequests = category.solicitacao.filter(
      ({ status }) => status !== "finalizado"
    );
    if (!!openRequests.length)
      throw new ConflictError(
        "Não é possível deletar esta categoria, há solicitações não finalizadas vinculadas a ela."
      );
    return "Categoria deletada com sucesso.";
  } catch (error) {
    throw error;
  }
};
