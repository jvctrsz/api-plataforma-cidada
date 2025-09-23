import { UserType } from "../../Controller/types";
import { CError } from "../../Utils/Errors/CError";
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
      throw new CError({ error: "Já existe um usuário com este email." }, 409);
    const existingCPF = await prisma.usuarios.findUnique({
      where: { cpf: cpf },
    });
    if (!!existingCPF)
      throw new CError({ error: "Já existe um usuário com este cpf." }, 409);

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
