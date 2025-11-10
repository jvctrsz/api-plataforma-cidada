import { prisma } from "../../Utils/prisma";

export const requestTotals = async () => {
  try {
    const [total, criadas, andamento, pendente, finalizado] = await Promise.all(
      [
        prisma.solicitacao.count(),
        prisma.solicitacao.count({ where: { status: "criado" } }),
        prisma.solicitacao.count({ where: { status: "andamento" } }),
        prisma.solicitacao.count({ where: { status: "pendente" } }),
        prisma.solicitacao.count({ where: { status: "finalizado" } }),
      ]
    );
    return {
      total,
      criadas,
      andamento,
      pendente,
      finalizado,
    };
  } catch (error) {
    throw error;
  }
};
