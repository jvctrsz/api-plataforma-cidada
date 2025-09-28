import { RequestFields } from "../../Controller/types";
import { NotFoundError } from "../../Utils/Errors/CError";
import { prisma } from "../../Utils/prisma";

export const updateRequest = async (
  id: number,
  parsed: Partial<RequestFields>
) => {
  try {
    const request = await prisma.solicitacao.findUnique({ where: { id } });
    if (!request) throw new NotFoundError("Solicitação não encontrada.");
    const {
      bairro,
      cep,
      cidade,
      descricao,
      endereco,
      numero,
      observacao,
      referencia,
      uf,
    } = parsed;
    await prisma.solicitacao.update({
      where: { id },
      data: {
        bairro,
        cep,
        cidade,
        descricao,
        endereco,
        numero,
        observacao,
        referencia,
        uf,
        atualizado_em: new Date(),
      },
    });

    return "Solicitação editada com sucesso.";
  } catch (error) {
    throw Error;
  }
};
