import { Request, Response } from "express";
import { ChangePassword } from "./change";
import { CError } from "../../Utils/Errors/CError";
import { zodParse } from "../../Utils/Functions/zodParse";
import { redefineUsers } from "../../Services/Users/redefineUsers";
import { object, string } from "zod";
import { email, stringRequired } from "../../Utils/Errors/Zod/validation";
import { redefineScheme } from "../../Schemes/user.scheme";

export interface RedefinePassword {
  email: string;
  nova_senha: string;
  confirma_senha: string;
}

export const redefine = async (
  req: Request<{}, {}, RedefinePassword>,
  res: Response
) => {
  try {
    const { token } = req.params as { token: string };
    const parsed = zodParse(req, redefineScheme);
    const message = await redefineUsers(token, parsed?.data);
    res.status(200).json({ message });
  } catch (error) {
    console.error(error);
    if (error instanceof CError)
      return res.status(error.status).json(error.data);
    res.status(500).json({ message: "Internal Server error!", error });
  }
};
