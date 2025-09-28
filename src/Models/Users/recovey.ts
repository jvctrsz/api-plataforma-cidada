import { Request, Response } from "express";
import { UserType } from "../../Controller/types";
import { recoveryUsers } from "../../Services/Users/recoveryUsers";
import { zodParse } from "../../Utils/Functions/zodParse";
import { recoveryScheme } from "../../Schemes/user.scheme";
import { TreatErrors } from "../../Utils/Errors/TreatErrors";

export const recovery = async (
  req: Request<{}, {}, UserType>,
  res: Response
) => {
  try {
    const parsed = zodParse(req, recoveryScheme);
    const message = await recoveryUsers(parsed?.data);
    res.status(200).json({ message });
  } catch (error) {
    TreatErrors(error, res);
  }
};
