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
      prioridade,
      categoria_id,
    } = parsed;

    const category_id = categoria_id ?? request.categoria_id;

    const category = await prisma.categorias.findUnique({
      where: { id: Number(category_id) },
    });
    if (!category) throw new NotFoundError("Categoria não encontrada.");

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
        prioridade,
        atualizado_em: new Date(),
        secretaria_id: Number(category.secretaria_id),
        categoria_id: Number(category_id),
      },
    });

    return "Solicitação editada com sucesso.";
  } catch (error) {
    throw error;
  }
};
