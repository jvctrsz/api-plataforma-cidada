import { CError } from "../../Utils/Errors/CError";
import { prisma } from "../../Utils/prisma";

export const showSecretariats = async (id: number) => {
  try {
    const secretariat = await prisma.secretaria.findUnique({ where: { id } });
    if (!secretariat)
      throw new CError({ error: "Secretaria não encontrada." }, 404);
    return secretariat;
  } catch (error) {
    throw error;
  }
};
