import { Request, Response } from "express";
import { zodParse } from "../../Utils/Functions/zodParse";
import { UserType } from "../../Controller/types";
import { updateUser } from "../../Services/Users/updateUser";
import { putUserScheme } from "../../Schemes/user.scheme";
import { TreatErrors } from "../../Utils/Errors/TreatErrors";

export const update = async (req: Request<{}, {}, UserType>, res: Response) => {
  try {
    const { id } = req.params as UserType;
    const parsed = zodParse(req, putUserScheme);
    const user = await updateUser(Number(id), parsed?.data);
    res.status(201).json(user);
  } catch (error) {
    TreatErrors(error, res);
  }
};
