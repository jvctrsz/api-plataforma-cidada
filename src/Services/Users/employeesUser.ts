import { prisma } from "../../Utils/prisma";
import { omitUser } from "./Utils/functions";

export const employeesUser = async () => {
  try {
    const users = await prisma.usuarios.findMany({
      where: { role: "funcionario" },
      omit: { ...omitUser, cpf: true, celular: true, telefone: true },
    });
    return users;
  } catch (error) {
    throw error;
  }
};
