import { Request } from "express";
import { UserType } from "../../Controller/types";
declare module "express-serve-static-core" {
  interface Request {
    user: UserType;
  }
}
