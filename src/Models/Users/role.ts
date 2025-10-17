import { Request, Response } from "express";
import { TreatErrors } from "../../Utils/Errors/TreatErrors";
import { zodParse } from "../../Utils/Functions/zodParse";
import { roleScheme } from "../../Schemes/user.scheme";
import { ForbiddenError } from "../../Utils/Errors/CError";
import { roleUser } from "../../Services/Users/roleUser";

export const role = async (req: Request, res: Response) => {
  try {
    const userRole = req.role;
    if (userRole !== "admin")
      throw new ForbiddenError("Usuário não tem permissão para esta operação.");
    const { id } = req.params;
    const parsed = zodParse(req, roleScheme);
    const message = await roleUser(Number(id), parsed?.data);
    res.json({ message });
  } catch (error) {
    TreatErrors(error, res);
  }
};
