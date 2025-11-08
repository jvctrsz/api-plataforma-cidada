import { RequestQueries, UserRole } from "../../Controller/types";
import { prisma } from "../../Utils/prisma";

export const indexRequests = async (
  queries: RequestQueries,
  role: UserRole,
  user_id: number
) => {
  try {
    const queryByRole = () => {
      if (role === "usuario") return { usuarios_id: user_id };
      if (role === "funcionario") return { funcionario_id: user_id };
    };
    const { funcionario_id, secretaria_id, status, prioridade, protocolo } =
      queries;
    const requests = await prisma.solicitacao.findMany({
      where: {
        ...queryByRole(),
        ...(funcionario_id &&
          role !== "funcionario" && {
            funcionario_id: { equals: Number(funcionario_id) },
          }),
        ...(secretaria_id && {
          secretaria_id: { equals: Number(secretaria_id) },
        }),
        ...(status && {
          status: { equals: status },
        }),
        ...(prioridade && {
          prioridade: { equals: prioridade },
        }),
        ...(protocolo && {
          protocolo: { contains: protocolo },
        }),
      },
      orderBy: { id: "asc" },
    });
    return requests;
  } catch (error) {
    throw error;
  }
};
