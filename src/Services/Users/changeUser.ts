import { ChangePassword } from "../../Models/Users/change";
import { CError } from "../../Utils/Errors/CError";
import { hashPassword } from "../../Utils/Functions/hashPassword";
import { prisma } from "../../Utils/prisma";
import argon2 from "argon2";

export const changeUser = async (id: number, parsed: ChangePassword) => {
  try {
    const user = await prisma.usuarios.findUnique({ where: { id } });
    if (!user) throw new CError({ error: "Usuário não encontrado." }, 404);
    if (!!user.google_id)
      throw new CError(
        { error: "Usuário cadastrado através da autenticação com google." },
        403
      );

    const { confirma_senha, nova_senha, senha_atual } = parsed;
    const isEqual = await argon2.verify(user.senha!, senha_atual);
    if (!isEqual)
      throw new CError(
        { senha_atual: "A senha atual inserida é incorreta." },
        400
      );

    if (confirma_senha !== nova_senha)
      throw new CError(
        { error: "Nova senha e confirma senha não coincidem." },
        400
      );

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
