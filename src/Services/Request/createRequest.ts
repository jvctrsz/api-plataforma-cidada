import { RequestFields } from "../../Controller/types";
import { CError } from "../../Utils/Errors/CError";
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
    } = parsed;

    const user = await prisma.usuarios.findUnique({ where: { id } });
    if (!user) throw new CError({ error: "Usuário não encontrado." }, 404);

    const secretariat = await prisma.secretaria.findUnique({
      where: { id: Number(secretaria_id) },
    });
    if (!secretariat)
      throw new CError({ error: "Secretaria não encontrada." }, 404);
    if (!secretariat.ativo)
      throw new CError({ error: "Secretaria está desativada." }, 409);

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
        secretaria_id: Number(secretaria_id),
        usuarios_id: user.id,
      },
    });
    return "Solicitação criada com sucesso.";
  } catch (error) {
    throw error;
  }
};
