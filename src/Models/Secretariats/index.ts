import { Request, Response } from "express";
import { indexSecretariats } from "../../Services/Secretariats/indexSecretariats";
import { TreatErrors } from "../../Utils/Errors/TreatErrors";
import { zodParse } from "../../Utils/Functions/zodParse";
import { secretariatQueryScheme } from "../../Schemes/secretariats.scheme";

export const index = async (req: Request, res: Response) => {
  try {
    const queries = zodParse(req, secretariatQueryScheme, true);
    const secretariats = await indexSecretariats(queries?.data);
    res.status(200).json(secretariats);
  } catch (error) {
    TreatErrors(error, res);
  }
};
