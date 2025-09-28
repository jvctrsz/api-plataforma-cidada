import { SecretariatsType } from "../../Controller/types";
import { ConflictError, NotFoundError } from "../../Utils/Errors/CError";
import { prisma } from "../../Utils/prisma";

export const createSecretariats = async (parsed: SecretariatsType) => {
  try {
    const {
      nome,
      secretario_id,
      bairro,
      celular,
      cep,
      cidade,
      descricao,
      email,
      logradouro,
      numero,
      telefone,
      uf,
      whatsapp,
    } = parsed;
    const secretariat = await prisma.secretaria.findUnique({
      where: { nome: nome },
    });
    if (!!secretariat)
      throw new ConflictError("Já existe uma secretaria com este nome");

    const user = await prisma.usuarios.findUnique({
      where: { id: Number(secretario_id) },
    });
    if (!user) throw new NotFoundError("Secretario não encontrado");
    if (!user.valido)
      throw new ConflictError("Secretario aguardando validação");

    const existingSecretariat = await prisma.secretaria.findUnique({
      where: { secretario_id: Number(secretario_id) },
    });
    if (!!existingSecretariat)
      throw new ConflictError(
        "Já existe uma secretaria vinculada a este secretario"
      );

    await prisma.secretaria.create({
      data: {
        nome,
        secretario_id: Number(secretario_id),
        secretario_nome: user.nome,
        bairro,
        celular,
        cep,
        cidade,
        descricao,
        email,
        logradouro,
        numero,
        telefone,
        uf,
        whatsapp,
      },
    });
    return "Secretaria cadastrada com sucesso.";
  } catch (error) {
    throw error;
  }
};
