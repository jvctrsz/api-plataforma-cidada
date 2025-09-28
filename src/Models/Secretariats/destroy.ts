import { Request, Response } from "express";
import { destroySecretariats } from "../../Services/Secretariats/destroySecretariats";
import { TreatErrors } from "../../Utils/Errors/TreatErrors";

export const destroy = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const message = await destroySecretariats(Number(id));
    res.status(200).json({ message });
  } catch (error) {
    TreatErrors(error, res);
  }
};
