import { Request, Response } from "express";
import { UserType } from "../../Controller/types";
import { indexUsers } from "../../Services/Users/indexUsers";
import { TreatErrors } from "../../Utils/Errors/TreatErrors";

export const index = async (req: Request<{}, {}, UserType>, res: Response) => {
  try {
    const users = await indexUsers();
    res.status(200).json(users);
  } catch (error) {
    TreatErrors(error, res);
  }
};
