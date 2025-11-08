import { RequestFields } from "../../Controller/types";
import { ConflictError, NotFoundError } from "../../Utils/Errors/CError";
import { prisma } from "../../Utils/prisma";
import { getNewProtocol } from "./Utils/generateProtocol";

export const createRequest = async (id: number, parsed: RequestFields) => {
  try {
    const {
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
      categoria_id,
    } = parsed;

    const user = await prisma.usuarios.findUnique({ where: { id } });
    if (!user) throw new NotFoundError("Usuário não encontrado.");

    const category = await prisma.categorias.findUnique({
      where: { id: Number(categoria_id) },
    });
    const secretaria_id = category?.secretaria_id;
    if (!category) throw new NotFoundError("Categoria não encontrada.");

    const secretariat = await prisma.secretaria.findUnique({
      where: { id: Number(secretaria_id) },
    });
    if (!secretariat) throw new NotFoundError("Secretaria não encontrada.");
    if (!secretariat.ativo)
      throw new ConflictError("Secretaria está desativada.");

    const requests = await prisma.solicitacao.findMany();
    const protocols = (requests ?? []).map(({ protocolo }) => protocolo);
    const protocolo = getNewProtocol(protocols);

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
        categoria_id: Number(categoria_id),
        protocolo,
      },
    });
    return "Solicitação criada com sucesso.";
  } catch (error) {
    throw error;
  }
};
