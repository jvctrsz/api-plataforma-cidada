import { Request, Response } from "express";
import { CError } from "../../Utils/Errors/CError";
import { zodParse } from "../../Utils/Functions/zodParse";
import { changeUser } from "../../Services/Users/changeUser";
import { changeScheme } from "../../Schemes/user.scheme";

export interface ChangePassword {
  senha_atual: string;
  nova_senha: string;
  confirma_senha: string;
}

export const change = async (
  req: Request<{}, {}, ChangePassword>,
  res: Response
) => {
  try {
    const id = req.user_id;
    const parsed = zodParse(req, changeScheme);
    const message = await changeUser(Number(id), parsed.data);
    res.status(200).json({ message });
  } catch (error) {
    console.error(error);
    if (error instanceof CError)
      return res.status(error.status).json(error.data);
    res.status(500).json({ message: "Internal Server error!", error });
  }
};
