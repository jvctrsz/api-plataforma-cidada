import { RequestFields } from "../../Controller/types";
import { ConflictError, NotFoundError } from "../../Utils/Errors/CError";
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
    const secretaria_id = category?.secretaria_id;

    const secretariat = await prisma.secretaria.findUnique({
      where: { id: Number(secretaria_id) },
    });
    if (!secretariat) throw new NotFoundError("Secretaria não encontrada.");
    if (!secretariat.ativo)
      throw new ConflictError("Secretaria está desativada.");

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
        funcionario_id: secretariat.secretario_id,
        atualizado_em: new Date(),
        categoria_id: Number(category_id),
      },
    });

    return "Solicitação editada com sucesso.";
  } catch (error) {
    throw error;
  }
};
