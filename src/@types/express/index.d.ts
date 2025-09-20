import { Request } from "express";
import { UserType } from "../../Controller/Users/types";
declare module "express-serve-static-core" {
  interface Request {
    user: UserType;
  }
}
