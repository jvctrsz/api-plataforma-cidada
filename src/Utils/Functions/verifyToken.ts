import { verify } from "jsonwebtoken";
import { CError } from "../Errors/CError";

export const verifyToken = async (token: string, hash: string) => {
  try {
    return verify(token, hash);
  } catch (error) {
    throw new CError(
      { error: "Não é possível continuar, token inválido." },
      422
    );
  }
};
