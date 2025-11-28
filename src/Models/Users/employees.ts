import { Request, Response } from "express";
import { TreatErrors } from "../../Utils/Errors/TreatErrors";
import { employeesUser } from "../../Services/Users/employeesUser";
import { zodParse } from "../../Utils/Functions/zodParse";
import { employeeQueryScheme } from "../../Schemes/user.scheme";

export const employees = async (req: Request, res: Response) => {
  try {
    const queries = zodParse(req, employeeQueryScheme, true);
    const users = await employeesUser(queries.data);
    res.status(200).json(users);
  } catch (error) {
    TreatErrors(error, res);
  }
};
