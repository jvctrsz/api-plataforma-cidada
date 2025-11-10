import { CategoriesType } from "../../Controller/types";
import { ConflictError, NotFoundError } from "../../Utils/Errors/CError";
import { prisma } from "../../Utils/prisma";

export const updateCategories = async (
  id: number,
  parsed: Partial<CategoriesType>
) => {
  try {
    const category = await prisma.categorias.findUnique({
      where: { id },
      include: { solicitacao: true },
    });
    if (!category) throw new NotFoundError("Categoria não encontrada.");

    const { nome, secretaria_id } = parsed;

    const existsName = await prisma.categorias.findUnique({
      where: { nome, AND: { id: { not: id } } },
    });
    if (!!existsName)
      throw new ConflictError("Já existe uma categoria com este nome.");

    const secretary_id = secretaria_id ?? category.secretaria_id;

    const secretary = await prisma.secretaria.findUnique({
      where: { id: Number(secretary_id) },
    });
    if (!secretary) throw new NotFoundError("Secretaria não encontrada.");

    if (Number(secretary_id) !== category.secretaria_id) {
      const currentRequests = category.solicitacao.filter(
        ({ status }) => status !== "finalizado"
      );
      if (!!currentRequests.length)
        throw new ConflictError(
          "Não é possivel trocar para outra secretaria, há solicitações não finalizdas vinculadas a ela."
        );
    }

    await prisma.categorias.update({
      where: { id },
      data: {
        nome,
        secretaria_id: Number(secretary_id),
        secretataria_nome: secretary?.nome,
      },
    });

    return "Categoria editada com sucesso.";
  } catch (error) {
    throw error;
  }
};
