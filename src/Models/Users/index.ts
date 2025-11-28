import { Request, Response } from "express";
import { UserType } from "../../Controller/types";
import { indexUsers } from "../../Services/Users/indexUsers";
import { TreatErrors } from "../../Utils/Errors/TreatErrors";
import { zodParse } from "../../Utils/Functions/zodParse";
import { userQueryScheme } from "../../Schemes/user.scheme";

export const index = async (req: Request, res: Response) => {
  try {
    const queries = zodParse(req, userQueryScheme, true);
    const users = await indexUsers(queries?.data);
    res.status(200).json(users);
  } catch (error) {
    TreatErrors(error, res);
  }
};
