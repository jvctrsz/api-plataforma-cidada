import { NotFoundError } from "../../Utils/Errors/CError";
import { prisma } from "../../Utils/prisma";

export const showCategories = async (id: number) => {
  try {
    const category = await prisma.categorias.findUnique({ where: { id } });
    if (!category) throw new NotFoundError("Categoria não encontrada.");
    return category;
  } catch (error) {
    throw error;
  }
};
