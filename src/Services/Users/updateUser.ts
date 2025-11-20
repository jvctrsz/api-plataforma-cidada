import { UserType } from "../../Controller/types";
import { BadRequestError, ConflictError } from "../../Utils/Errors/CError";
import { prisma } from "../../Utils/prisma";
import { omitUser } from "./Utils/functions";

export const updateUser = async (id: number, parsed: Partial<UserType>) => {
  try {
    const user = await prisma.usuarios.findUnique({ where: { id } });
    if (!user) throw new BadRequestError("Usuário não encontrado.");

    const { celular, cpf: bodyCpf, email: bodyEmail, nome, telefone } = parsed;

    const email = bodyEmail ?? user.email;
    const cpf = bodyCpf ?? user.cpf!;

    const existingEmail = await prisma.usuarios.findUnique({
      where: { email, AND: { id: { not: id } } },
    });
    if (!!existingEmail)
      throw new ConflictError("Já existe usuário com este email.");
    const existingCPF = await prisma.usuarios.findUnique({
      where: { cpf, AND: { id: { not: id } } },
    });
    if (!!existingCPF)
      throw new ConflictError("Já existe usuário com este cpf.");

    const update = prisma.usuarios.update({
      where: { id },
      data: {
        celular: celular ?? user.celular,
        cpf,
        email,
        nome: nome ?? user.nome,
        telefone: telefone ?? user.telefone,
      },
      omit: omitUser,
    });
    return update;
  } catch (error) {
    throw error;
  }
};
