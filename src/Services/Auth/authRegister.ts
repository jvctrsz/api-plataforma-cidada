import { sign } from "jsonwebtoken";
import {
  createTransporter,
  sendLoginActivation,
} from "../../Utils/Functions/transporter";
import { UserType } from "../../Controller/types";
import { redefineAndLoginHTML } from "../Users/Utils/redefineHTML";

export const authRegister = async (user: UserType) => {
  try {
    const hash = process.env.LOGIN_JWT_SECRET;

    const token = sign({ id: user.id }, hash!, { expiresIn: "1d" });

    const html = redefineAndLoginHTML(user.nome, token, "ativar");
    const transporter = createTransporter();
    await transporter.sendMail(sendLoginActivation(user.email, html));

    return "Usuário criado - email de confirmação enviado.";
  } catch (error) {
    throw error;
  }
};
