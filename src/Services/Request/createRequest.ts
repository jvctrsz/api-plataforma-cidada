import { RequestFields } from "../../Controller/types";
import { ConflictError, NotFoundError } from "../../Utils/Errors/CError";
import { prisma } from "../../Utils/prisma";

export const createRequest = async (id: number, parsed: RequestFields) => {
  try {
    const {
      bairro,
      cep,
      cidade,
      descricao,
      endereco,
      numero,
      secretaria_id,
      uf,
      observacao,
      referencia,
      prioridade,
    } = parsed;

    const user = await prisma.usuarios.findUnique({ where: { id } });
    if (!user) throw new NotFoundError("Usuário não encontrado.");

    const secretariat = await prisma.secretaria.findUnique({
      where: { id: Number(secretaria_id) },
    });
    if (!secretariat) throw new NotFoundError("Secretaria não encontrada.");
    if (!secretariat.ativo)
      throw new ConflictError("Secretaria está desativada.");

    await prisma.solicitacao.create({
      data: {
        bairro,
        cep,
        cidade,
        descricao,
        endereco,
        numero,
        uf,
        observacao,
        referencia,
        prioridade,
        secretaria_id: Number(secretaria_id),
        usuarios_id: user.id,
        funcionario_id: secretariat.secretario_id,
      },
    });
    return "Solicitação criada com sucesso.";
  } catch (error) {
    throw error;
  }
};
