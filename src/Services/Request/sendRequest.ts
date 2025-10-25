import { RequestMessageFields } from "../../Controller/types";
import { NotFoundError } from "../../Utils/Errors/CError";
import { prisma } from "../../Utils/prisma";

export const sendRequest = async (
  id: number,
  parsed: RequestMessageFields,
  user_id: number
) => {
  try {
    const request = await prisma.solicitacao.findUnique({ where: { id } });
    if (!request) throw new NotFoundError("Solicitação não encontrada.");

    const user = await prisma.usuarios.findUnique({ where: { id: user_id } });
    if (!user) throw new NotFoundError("Usuário não encontrado.");

    const { mensagem } = parsed;

    const extractRecepientId = (() => {
      if (request.funcionario_id === user_id) return request.usuarios_id;
      return request.funcionario_id;
    })();

    await prisma.mensagens.create({
      data: {
        mensagem,
        solicitacao_id: id,
        remetente_id: user_id,
        destinatario_id: extractRecepientId,
        enviado_em: new Date(),
      },
    });

    return "Mensagem enviada com sucesso.";
  } catch (error) {
    throw error;
  }
};
