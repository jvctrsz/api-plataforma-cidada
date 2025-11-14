import { sign } from "jsonwebtoken";
import { UserRole } from "../../../Controller/types";

export const createJWT = (id: number, role: UserRole, hash: string) =>
  sign({ id, role }, hash, {
    expiresIn: "1d",
  });
