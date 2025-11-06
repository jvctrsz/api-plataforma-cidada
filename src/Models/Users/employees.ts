import { Request, Response } from "express";
import { TreatErrors } from "../../Utils/Errors/TreatErrors";
import { employeesUser } from "../../Services/Users/employeesUser";

export const employees = async (req: Request, res: Response) => {
  try {
    const users = await employeesUser();
    res.status(200).json(users);
  } catch (error) {
    TreatErrors(error, res);
  }
};
