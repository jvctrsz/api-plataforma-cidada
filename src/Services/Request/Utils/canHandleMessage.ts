import { UserRole } from "../../../Controller/types";
import { ForbiddenError } from "../../../Utils/Errors/CError";

export const canHandleMessage = (
  employee_id: number,
  user_request_id: number,
  user_id: number,
  role: UserRole
) => {
  if (![employee_id, user_request_id].includes(user_id) && role !== "admin")
    throw new ForbiddenError("Usuário não pertence a esta solicitação.");
};
