import { Request, Response } from "express";
import { showSecretariats } from "../../Services/Secretariats/showSecretariats";
import { TreatErrors } from "../../Utils/Errors/TreatErrors";

export const show = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const secretariat = await showSecretariats(Number(id));
    res.status(200).json(secretariat);
  } catch (error) {
    TreatErrors(error, res);
  }
};
