import { Request, Response } from "express";
import { zodParse } from "../../Utils/Functions/zodParse";
import { changeUser } from "../../Services/Users/changeUser";
import { changeScheme } from "../../Schemes/user.scheme";
import { TreatErrors } from "../../Utils/Errors/TreatErrors";

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
    TreatErrors(error, res);
  }
};
