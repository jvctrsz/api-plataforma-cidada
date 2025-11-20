import { verify } from "jsonwebtoken";
import { CError, ForbiddenError } from "../../../Utils/Errors/CError";
import { UserRole } from "../../../Controller/types";

export const omitUser = {
  google_id: true,
  redefinido_em: true,
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

interface UserPermission {
  role: UserRole;
  id: number | string;
  user_id: number | string;
}
export const userPermission = ({ id, role, user_id }: UserPermission) => {
  if (role !== "admin" && Number(id) !== Number(user_id))
    throw new ForbiddenError("Usuário não tem permissão para esta operação.");
};
