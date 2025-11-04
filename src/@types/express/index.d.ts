import { Request } from "express";
import { UserRole, UserType } from "../../Controller/types";
declare module "express-serve-static-core" {
  interface Request {
    user_id: number;
    role: UserRole;
    token: string;
    files?: Express.Multer.File[];
  }
}
