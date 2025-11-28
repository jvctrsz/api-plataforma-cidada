import { RequestQueries, UserRole } from "../../Controller/types";
import { prisma } from "../../Utils/prisma";

export const indexRequests = async (
  queries: Partial<RequestQueries>,
  role: UserRole,
  user_id: number
) => {
  try {
    const queryByRole = () => {
      if (role === "usuario") return { usuarios_id: user_id };
    };
    const {
      funcionario_id,
      secretaria_id,
      status,
      prioridade,
      protocolo,
      categoria_id,
      bairro,
      cep,
      cidade,
      descricao,
      endereco,
      numero,
      referencia,
      uf,
    } = queries;
    const requests = await prisma.solicitacao.findMany({
      where: {
        ...queryByRole(),
        ...(!!Number(funcionario_id) &&
          role !== "funcionario" && {
            funcionario_id: { equals: Number(funcionario_id) },
          }),
        ...(!!Number(secretaria_id) && {
          secretaria_id: { equals: Number(secretaria_id) },
        }),
        ...(!!Number(categoria_id) && {
          categoria_id: { equals: Number(categoria_id) },
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
        ...(bairro && {
          bairro: { contains: bairro },
        }),
        ...(cep && {
          cep: { contains: cep },
        }),
        ...(cidade && {
          cidade: { contains: cidade },
        }),
        ...(descricao && {
          descricao: { contains: descricao },
        }),
        ...(endereco && {
          endereco: { contains: endereco },
        }),
        ...(numero && {
          numero: { contains: numero },
        }),
        ...(referencia && {
          referencia: { contains: referencia },
        }),
        ...(uf && {
          uf: { contains: uf },
        }),
      },
      include: {
        categoria: true,
      },
      orderBy: { id: "asc" },
    });
    return requests;
  } catch (error) {
    throw error;
  }
};
