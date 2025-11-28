import { CategoriesType } from "../../Controller/types";
import { ConflictError, NotFoundError } from "../../Utils/Errors/CError";
import { prisma } from "../../Utils/prisma";

export const storeCategories = async (parsed: CategoriesType) => {
  try {
    const { nome, secretaria_id } = parsed;
    const existsName = await prisma.categorias.findUnique({ where: { nome } });
    if (!!existsName)
      throw new ConflictError("Já existe uma categoria com este nome.");

    const secretary = await prisma.secretaria.findUnique({
      where: { id: Number(secretaria_id) },
    });
    if (!secretary) throw new NotFoundError("Secretaria não encontrada.");
    if (!secretary.ativo)
      throw new ConflictError(
        "Não foi possível vincular, secretaria esta inativa."
      );

    await prisma.categorias.create({
      data: {
        nome,
        secretaria_id: Number(secretaria_id),
        secretataria_nome: secretary.nome,
      },
    });
    return "Categoria cadastrada com sucesso.";
  } catch (error) {
    throw error;
  }
};
