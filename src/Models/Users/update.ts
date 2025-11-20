import { Request, Response } from "express";
import { zodParse } from "../../Utils/Functions/zodParse";
import { updateUser } from "../../Services/Users/updateUser";
import { putUserScheme } from "../../Schemes/user.scheme";
import { TreatErrors } from "../../Utils/Errors/TreatErrors";
import { userPermission } from "../../Services/Users/Utils/functions";

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { user_id, role } = req;
    userPermission({ id, role, user_id });
    const parsed = zodParse(req, putUserScheme);
    const user = await updateUser(Number(id), parsed?.data);
    res.status(201).json(user);
  } catch (error) {
    TreatErrors(error, res);
  }
};
