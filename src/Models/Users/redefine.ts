import { Request, Response } from "express";
import { zodParse } from "../../Utils/Functions/zodParse";
import { redefineUsers } from "../../Services/Users/redefineUsers";
import { redefineScheme } from "../../Schemes/user.scheme";
import { TreatErrors } from "../../Utils/Errors/TreatErrors";

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
    TreatErrors(error, res);
  }
};
