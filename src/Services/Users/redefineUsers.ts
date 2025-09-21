import { RedefinePassword } from "../../Models/Users/redefine";
import { CError } from "../../Utils/Errors/CError";
import { hashPassword } from "../../Utils/Functions/hashPassword";
import { prisma } from "../../Utils/prisma";
import { verifyPasswordToken } from "./Utils/functions";

export const redefineUsers = async (
  token: string,
  parsed: RedefinePassword
) => {
  try {
    const hash = process.env.RECOVERY_JWT_SECRET;
    const decoded = (await verifyPasswordToken(token, hash!)) as { id: string };
    const { confirma_senha, nova_senha, email } = parsed;

    const user = await prisma.usuarios.findUnique({
      where: { id: Number(decoded?.id), AND: { email: { equals: email } } },
    });
    if (!user) throw new CError({ error: "Usuário não encontrado." }, 404);

    if (confirma_senha !== nova_senha)
      throw new CError(
        { error: "Nova senha e confirma senha não coincidem." },
        400
      );

    const hashNewPassoword = await hashPassword(nova_senha);
    await prisma.usuarios.update({
      where: { id: user?.id },
      data: {
        senha: hashNewPassoword,
      },
    });
    return "Senha alterada com sucesso.";
  } catch (error) {
    throw error;
  }
};
