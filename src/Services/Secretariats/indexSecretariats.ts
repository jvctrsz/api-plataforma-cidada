import { SecretariatsQueries } from "../../Controller/types";
import { prisma } from "../../Utils/prisma";

export const indexSecretariats = async (queries: SecretariatsQueries) => {
  try {
    const { nome, secretario_id, secretario_nome } = queries;
    const secretariats = await prisma.secretaria.findMany({
      orderBy: { id: "asc" },
      where: {
        ...(nome && { nome: { contains: nome } }),
        ...(!!Number(secretario_id) && {
          secretario_id: { equals: Number(secretario_id) },
        }),
        ...(secretario_nome && {
          secretario_nome: { contains: secretario_nome },
        }),
      },
    });
    return secretariats;
  } catch (error) {
    throw error;
  }
};
