import { NotFoundError } from "../../Utils/Errors/CError";
import { prisma } from "../../Utils/prisma";

export const showSecretariats = async (id: number) => {
  try {
    const secretariat = await prisma.secretaria.findUnique({ where: { id } });
    if (!secretariat) throw new NotFoundError("Secretaria não encontrada.");
    return secretariat;
  } catch (error) {
    throw error;
  }
};
