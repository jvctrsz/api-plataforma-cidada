import { RequestQueries } from "../../Controller/types";
import { prisma } from "../../Utils/prisma";

export const indexRequests = async (queries: RequestQueries) => {
  try {
    const { funcionario_id, secretaria_id, status } = queries;
    const requests = await prisma.solicitacao.findMany({
      where: {
        ...(funcionario_id && {
          funcionario_id: { equals: Number(funcionario_id) },
        }),
        ...(secretaria_id && {
          secretaria_id: { equals: Number(secretaria_id) },
        }),
        ...(status && {
          status: { equals: status },
        }),
      },
    });
    return requests;
  } catch (error) {
    throw error;
  }
};
