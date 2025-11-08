import { CategoriesType } from "../../Controller/types";
import { ConflictError } from "../../Utils/Errors/CError";
import { prisma } from "../../Utils/prisma";

export const storeCategories = async (parsed: CategoriesType) => {
  try {
    const { nome } = parsed;
    const existsName = await prisma.categorias.findUnique({ where: { nome } });
    if (!!existsName)
      throw new ConflictError("Já existe uma categoria com este nome.");

    await prisma.categorias.create({ data: { nome } });
    return "Categoria cadastrada com sucesso.";
  } catch (error) {
    throw error;
  }
};
