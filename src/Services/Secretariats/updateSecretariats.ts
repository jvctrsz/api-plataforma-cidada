import { SecretariatsType } from "../../Controller/types";
import { CError } from "../../Utils/Errors/CError";
import { prisma } from "../../Utils/prisma";

export const updateSecretariats = async (
  id: number,
  parsed: SecretariatsType
) => {
  try {
    const secretariat = await prisma.secretaria.findUnique({ where: { id } });
    if (!secretariat)
      throw new CError({ error: "Secretaria não encontrada" }, 404);

    const { nome } = parsed;
    const existingName = await prisma.secretaria.findUnique({
      where: { nome, AND: { id: { not: id } } },
    });
    if (!!existingName)
      throw new CError(
        { error: "Já existe uma secretaria com este nome" },
        409
      );

    await prisma.secretaria.update({ where: { id }, data: { nome } });
    return "Secretaria editada com sucesso.";
  } catch (error) {
    throw error;
  }
};
