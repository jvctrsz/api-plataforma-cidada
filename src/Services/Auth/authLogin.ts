import { sign } from "jsonwebtoken";
import { LoginType } from "../../Models/Auth/login";
import { CError } from "../../Utils/Errors/CError";
import { prisma } from "../../Utils/prisma";
import argon2 from "argon2";

const defaultError = { error: "As credenciais informadas estão incorretas." };

export const authLogin = async (parsed: LoginType) => {
  try {
    const hash = process.env.LOGIN_JWT_SECRET;
    if (!hash) throw new CError({ message: "Internal Server Error!" }, 500);

    const { email, senha } = parsed;

    const user = await prisma.usuarios.findUnique({ where: { email } });
    if (!user) throw new CError(defaultError, 400);

    const isEqual = await argon2.verify(user.senha!, senha);
    if (!isEqual) throw new CError(defaultError, 400);

    const token = sign({ id: user.id, role: user.role }, hash, {
      expiresIn: "1d",
    });
    return token;
  } catch (error) {
    throw error;
  }
};
