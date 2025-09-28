import { Request, Response } from "express";
import { indexSecretariats } from "../../Services/Secretariats/indexSecretariats";
import { TreatErrors } from "../../Utils/Errors/TreatErrors";

export const index = async (req: Request, res: Response) => {
  try {
    const secretariats = await indexSecretariats();
    res.status(200).json(secretariats);
  } catch (error) {
    TreatErrors(error, res);
  }
};
