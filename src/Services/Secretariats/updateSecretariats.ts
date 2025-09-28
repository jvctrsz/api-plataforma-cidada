import { SecretariatsType } from "../../Controller/types";
import {
  CError,
  ConflictError,
  NotFoundError,
} from "../../Utils/Errors/CError";
import { prisma } from "../../Utils/prisma";

export const updateSecretariats = async (
  id: number,
  parsed: SecretariatsType
) => {
  try {
    const secretariat = await prisma.secretaria.findUnique({ where: { id } });
    if (!secretariat) throw new NotFoundError("Secretaria não encontrada");

    const {
      nome,
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
    const existingName = await prisma.secretaria.findUnique({
      where: { nome, AND: { id: { not: id } } },
    });
    if (!!existingName)
      throw new ConflictError("Já existe uma secretaria com este nome.");

    await prisma.secretaria.update({
      where: { id },
      data: {
        nome,
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
        atualizado_em: new Date(),
      },
    });
    return "Secretaria editada com sucesso.";
  } catch (error) {
    throw error;
  }
};
