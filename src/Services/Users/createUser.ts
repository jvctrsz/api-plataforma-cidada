import { UserType } from "../../Controller/Users/types";
import { CError } from "../../Utils/Errors/CError";
import { prisma } from "../../Utils/prisma";

export const createUser = async (parsed: UserType) => {
  try {
    const { email } = parsed;
    const user = await prisma.usuarios.findUnique({ where: { email: email } });

    if (user)
      throw new CError({ error: "Já existe usuário com este nome." }, 409);
  } catch (error) {
    throw error;
  }
};
