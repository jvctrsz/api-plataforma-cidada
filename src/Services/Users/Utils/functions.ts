import { verify } from "jsonwebtoken";
import { CError } from "../../../Utils/Errors/CError";

export const omitUser = {
  google_id: true,
  refreshPasswordTime: true,
  refreshPasswordToken: true,
  senha: true,
};

export const verifyPasswordToken = async (token: string, hash: string) => {
  try {
    return verify(token, hash);
  } catch (error) {
    throw new CError(
      { error: "Não é possível continuar, token expirado." },
      422
    );
  }
};
