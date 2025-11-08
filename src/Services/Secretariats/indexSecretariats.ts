import { prisma } from "../../Utils/prisma";

export const indexSecretariats = async () => {
  try {
    const secretariats = await prisma.secretaria.findMany({
      orderBy: { id: "asc" },
    });
    return secretariats;
  } catch (error) {
    throw error;
  }
};
