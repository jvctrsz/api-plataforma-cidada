import { Request } from "express";
import { UserType } from "../../Controller/types";
declare module "express-serve-static-core" {
  interface Request {
    user_id: number;
    role: string;
  }
}
