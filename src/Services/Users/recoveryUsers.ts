import { sign } from "jsonwebtoken";
import { prisma } from "../../Utils/prisma";
import { NotFoundError } from "../../Utils/Errors/CError";
import { redefineAndLoginHTML } from "./Utils/redefineHTML";
import { createTransporter } from "../../Utils/Functions/transporter";

export const recoveryUsers = async (parsed: { email: string }) => {
  try {
    const SECRET_HASH = process.env.RECOVERY_JWT_SECRET;
    const { email } = parsed;
    const user = await prisma.usuarios.findUnique({ where: { email } });
    if (!user) throw new NotFoundError("Usuário não encontrado.");

    const token = sign({ id: user?.id }, SECRET_HASH!, { expiresIn: "10m" });

    const transporter = createTransporter();

    const html = redefineAndLoginHTML(user.nome, token, "redefinir");

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Recuperação de senha",
      html,
    });
    return "Link de recuperação enviado com sucesso.";
  } catch (error) {
    throw error;
  }
};
