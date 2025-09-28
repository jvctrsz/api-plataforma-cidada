import { UserType } from "../../Controller/types";
import { ConflictError } from "../../Utils/Errors/CError";
import { hashPassword } from "../../Utils/Functions/hashPassword";
import { prisma } from "../../Utils/prisma";
import { omitUser } from "./Utils/functions";

export const createUser = async (parsed: UserType) => {
  try {
    const { email, senha, celular, cpf, nome, telefone } = parsed;
    const existingEmail = await prisma.usuarios.findUnique({
      where: { email: email },
    });
    if (!!existingEmail)
      throw new ConflictError("Já existe um usuário com este email.");
    const existingCPF = await prisma.usuarios.findUnique({
      where: { cpf: cpf },
    });
    if (!!existingCPF)
      throw new ConflictError("Já existe um usuário com este cpf.");

    const hash = await hashPassword(senha!);
    const user = await prisma.usuarios.create({
      data: {
        celular,
        cpf,
        email,
        nome,
        telefone,
        senha: hash,
      },
      omit: omitUser,
    });
    return user;
  } catch (error) {
    throw error;
  }
};
