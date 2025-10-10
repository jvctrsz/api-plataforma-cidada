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

    const { mensagem, solicitacao_id, usuario_id } = parsed;

    await prisma.mensagens.create({
      data: {
        mensagem,
        solicitacao_id: Number(solicitacao_id),
        usuario_id: Number(usuario_id),
        enviado_em: new Date(),
      },
    });

    return "Mensagem enviada com sucesso.";
  } catch (error) {
    throw error;
  }
};
