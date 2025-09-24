import { prisma } from "../../Utils/prisma";

export const indexSecretariats = async () => {
  try {
    const secretariats = await prisma.secretaria.findMany();
    return secretariats;
  } catch (error) {
    throw error;
  }
};
