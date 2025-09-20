import { prisma } from "../../Utils/prisma";

export const indexUsers = async () => {
  try {
    const users = await prisma.usuarios.findMany({
      omit: {
        google_id: true,
        refreshPasswordTime: true,
        refreshPasswordToken: true,
        senha: true,
      },
    });
    return users;
  } catch (error) {
    throw error;
  }
};
