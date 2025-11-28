import { UserQueries } from "../../Controller/types";
import { prisma } from "../../Utils/prisma";
import { omitUser } from "./Utils/functions";

export const indexUsers = async (parsed: Partial<UserQueries>) => {
  try {
    const { celular, cpf, criado_em, email, nome, role, telefone, valido } =
      parsed;
    const users = await prisma.usuarios.findMany({
      omit: omitUser,
      where: {
        ...(celular && {
          celular: { contains: celular },
        }),
        ...(cpf && {
          cpf: { equals: cpf },
        }),
        ...(criado_em && {
          criado_em: { equals: criado_em },
        }),
        ...(email && {
          email: { contains: email },
        }),
        ...(nome && {
          nome: { contains: nome },
        }),
        ...(role && {
          role: { equals: role },
        }),
        ...(telefone && {
          telefone: { contains: telefone },
        }),
        ...(valido && {
          valido: { equals: valido === "true" },
        }),
      },
      orderBy: { id: "asc" },
    });
    return users;
  } catch (error) {
    throw error;
  }
};
