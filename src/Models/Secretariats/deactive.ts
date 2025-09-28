import { Request, Response } from "express";
import { changeStatusSecretariats } from "../../Services/Secretariats/changeStatusSecretariats";
import { TreatErrors } from "../../Utils/Errors/TreatErrors";

export const deactive = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const message = await changeStatusSecretariats(Number(id), "desativar");
    res.json({ message });
  } catch (error) {
    TreatErrors(error, res);
  }
};
