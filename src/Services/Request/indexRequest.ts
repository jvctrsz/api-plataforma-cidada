import { prisma } from "../../Utils/prisma";

export const indexRequests = async () => {
  try {
    const requests = await prisma.solicitacao.findMany();
    return requests;
  } catch (error) {
    throw error;
  }
};
