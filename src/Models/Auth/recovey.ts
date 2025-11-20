import { Request, Response } from "express";
import { zodParse } from "../../Utils/Functions/zodParse";
import { recoveryScheme } from "../../Schemes/user.scheme";
import { TreatErrors } from "../../Utils/Errors/TreatErrors";
import { recoveryUsers } from "../../Services/Auth/recoveryUsers";

export const recovery = async (req: Request, res: Response) => {
  try {
    const parsed = zodParse(req, recoveryScheme);
    const message = await recoveryUsers(parsed?.data);
    res.status(200).json({ message });
  } catch (error) {
    TreatErrors(error, res);
  }
};
