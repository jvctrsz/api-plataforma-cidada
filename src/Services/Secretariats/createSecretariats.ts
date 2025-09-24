import { SecretariatsType } from "../../Controller/types";
import { CError } from "../../Utils/Errors/CError";
import { prisma } from "../../Utils/prisma";

export const createSecretariats = async (parsed: SecretariatsType) => {
  try {
    const { nome } = parsed;
    const secretariat = await prisma.secretaria.findUnique({
      where: { nome: nome },
    });
    if (!!secretariat)
      throw new CError({ error: "Secretaria já cadastrada." }, 409);

    await prisma.secretaria.create({ data: { nome } });
    return "Secretaria cadastrada com sucesso.";
  } catch (error) {
    throw error;
  }
};
