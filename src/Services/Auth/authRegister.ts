import { sign } from "jsonwebtoken";
import { createTransporter } from "../../Utils/Functions/transporter";
import { UserType } from "../../Controller/types";

export const authRegister = async (user: UserType) => {
  try {
    const hash = process.env.LOGIN_JWT_SECRET;

    const token = sign({ id: user.id }, hash!, { expiresIn: "1d" });

    const transporter = createTransporter();

    await transporter.sendMail({
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: "Validação de Conta",
      text: token,
    });

    return "Usuário criado - email de confirmação enviado.";
  } catch (error) {
    throw error;
  }
};
