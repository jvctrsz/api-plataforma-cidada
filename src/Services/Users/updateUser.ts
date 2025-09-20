import { UserType } from "../../Controller/types";
import { CError } from "../../Utils/Errors/CError";
import { prisma } from "../../Utils/prisma";
import { omitUser } from "./Utils/functions";

export const updateUser = async (id: number, parsed: Partial<UserType>) => {
  try {
    const user = await prisma.usuarios.findUnique({ where: { id } });
    if (!user) throw new CError({ error: "Usuário não encontrado." }, 404);

    const { celular, cpf, email, nome, telefone } = parsed;

    const existingEmail = await prisma.usuarios.findUnique({
      where: { email, AND: { id: { not: id } } },
    });
    if (!!existingEmail)
      throw new CError({ error: "Já existe usuário com este email." }, 409);
    const existingCPF = await prisma.usuarios.findUnique({
      where: { cpf, AND: { id: { not: id } } },
    });
    if (!!existingCPF)
      throw new CError({ error: "Já existe usuário com este cpf." }, 409);
    console.log(cpf?.length);
    const update = prisma.usuarios.update({
      where: { id },
      data: {
        celular,
        cpf,
        email,
        nome,
        telefone,
      },
      omit: omitUser,
    });
    return update;
  } catch (error) {
    throw error;
  }
};
