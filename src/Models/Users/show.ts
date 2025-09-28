import { Request, Response } from "express";
import { showUsers } from "../../Services/Users/showUsers";
import { TreatErrors } from "../../Utils/Errors/TreatErrors";

export const show = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await showUsers(Number(id));
    res.status(200).json(user);
  } catch (error) {
    TreatErrors(error, res);
  }
};
