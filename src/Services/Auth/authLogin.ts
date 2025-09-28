import { sign } from "jsonwebtoken";
import { LoginType } from "../../Models/Auth/login";
import {
  BadRequestError,
  CError,
  ForbiddenError,
  ServerError,
} from "../../Utils/Errors/CError";
import { prisma } from "../../Utils/prisma";
import argon2 from "argon2";
import { isSameDay } from "date-fns";
import {
  createTransporter,
  sendLoginActivation,
} from "../../Utils/Functions/transporter";
import { redefineAndLoginHTML } from "../Users/Utils/redefineHTML";

const defaultError = "As credenciais informadas estão incorretas.";

export const authLogin = async (parsed: LoginType) => {
  try {
    const hash = process.env.LOGIN_JWT_SECRET;
    if (!hash) throw new ServerError("Internal Server Error!");

    const { email, senha } = parsed;

    const user = await prisma.usuarios.findUnique({ where: { email } });
    if (!user) throw new BadRequestError(defaultError);

    if (!!user.google_id)
      throw new ForbiddenError("Usuário cadastrado através do google.");

    if (!user.valido) {
      if (!isSameDay(user.criado_em!, new Date())) {
        const token = sign({ id: user.id }, hash, { expiresIn: "1d" });
        const html = redefineAndLoginHTML(user.nome, token, "ativar");
        const transporter = createTransporter();
        await transporter.sendMail(sendLoginActivation(user.email, html));
      }
      throw new ForbiddenError(
        "Usuário aguardando validação - verificar caixa de email."
      );
    }

    const isEqual = await argon2.verify(user.senha!, senha);
    if (!isEqual) throw new BadRequestError(defaultError);

    const token = sign({ id: user.id, role: user.role }, hash, {
      expiresIn: "1d",
    });
    return token;
  } catch (error) {
    throw error;
  }
};
