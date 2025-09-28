import { ChangePassword } from "../../Models/Users/change";
import {
  BadRequestError,
  CError,
  ForbiddenError,
  NotFoundError,
} from "../../Utils/Errors/CError";
import { hashPassword } from "../../Utils/Functions/hashPassword";
import { prisma } from "../../Utils/prisma";
import argon2 from "argon2";

export const changeUser = async (id: number, parsed: ChangePassword) => {
  try {
    const user = await prisma.usuarios.findUnique({ where: { id } });
    if (!user) throw new NotFoundError("Usuário não encontrado.");
    if (!!user.google_id)
      throw new ForbiddenError(
        "Usuário cadastrado através da autenticação com google."
      );

    const { confirma_senha, nova_senha, senha_atual } = parsed;
    const isEqual = await argon2.verify(user.senha!, senha_atual);
    if (!isEqual)
      throw new BadRequestError("A senha atual inserida é incorreta.");

    if (confirma_senha !== nova_senha)
      throw new BadRequestError("Nova senha e confirma senha não coincidem.");

    const hashNewPassoword = await hashPassword(nova_senha);
    await prisma.usuarios.update({
      where: { id },
      data: {
        senha: hashNewPassoword,
      },
    });
    return "Senha alterada com sucesso.";
  } catch (error) {
    throw error;
  }
};
