import { CategoriesType } from "../../Controller/types";
import { prisma } from "../../Utils/prisma";

export const indexCategories = async (parsed: Partial<CategoriesType>) => {
  try {
    const { nome, secretaria_id, secretaria_nome } = parsed;
    const categories = await prisma.categorias.findMany({
      where: {
        ...(nome && { nome: { contains: nome } }),
        ...(secretaria_nome && {
          secretaria_nome: { contains: secretaria_nome },
        }),
        ...(!!Number(secretaria_id) && {
          secretaria_id: { equals: Number(secretaria_id) },
        }),
      },
      orderBy: { id: "asc" },
    });

    return categories;
  } catch (error) {
    throw error;
  }
};
