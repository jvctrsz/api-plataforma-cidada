import { Request, Response } from "express";
import { TreatErrors } from "../../Utils/Errors/TreatErrors";
import { changeEmployee } from "../../Services/Secretariats/changeEmployee";
import { zodParse } from "../../Utils/Functions/zodParse";
import { changeEmployeeScheme } from "../../Schemes/secretariats.scheme";

export const change = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsed = zodParse(req, changeEmployeeScheme);
    const message = await changeEmployee(Number(id), parsed?.data);
    res.status(201).json({ message });
  } catch (error) {
    TreatErrors(error, res);
  }
};
