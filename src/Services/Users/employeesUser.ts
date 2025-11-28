import { UserQueries } from "../../Controller/types";
import { prisma } from "../../Utils/prisma";
import { omitUser } from "./Utils/functions";

type employeesQueries = Omit<
  UserQueries,
  "cpf" | "celular" | "telefone" | "criado_em"
>;

export const employeesUser = async (parsed: Partial<employeesQueries>) => {
  try {
    const { email, nome, role, valido } = parsed;
    const users = await prisma.usuarios.findMany({
      where: {
        role: "funcionario",
        ...(nome && {
          nome: { contains: nome },
        }),
        ...(email && {
          email: { contains: email },
        }),
        ...(role && {
          role: { equals: role },
        }),
        ...(valido && {
          valido: { equals: valido === "true" },
        }),
      },
      omit: { ...omitUser, cpf: true, celular: true, telefone: true },
    });
    return users;
  } catch (error) {
    throw error;
  }
};
