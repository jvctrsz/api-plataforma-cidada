import { Request, Response } from "express";
import { dataUser } from "../../Services/Users/dataUser";
import { TreatErrors } from "../../Utils/Errors/TreatErrors";

export const user = async (req: Request, res: Response) => {
  try {
    const id = req.user_id;
    const user = await dataUser(id);
    res.status(200).json(user);
  } catch (error) {
    TreatErrors(error, res);
  }
};
