import { Request, Response } from "express";
import { zodParse } from "../../Utils/Functions/zodParse";
import { putSecretariatsScheme } from "../../Schemes/secretariats.scheme";
import { SecretariatsType } from "../../Controller/types";
import { updateSecretariats } from "../../Services/Secretariats/updateSecretariats";
import { TreatErrors } from "../../Utils/Errors/TreatErrors";

export const update = async (
  req: Request<{}, {}, SecretariatsType>,
  res: Response
) => {
  try {
    const { id } = req.params as { id: string };
    const parsed = zodParse(req, putSecretariatsScheme);
    const message = await updateSecretariats(Number(id), parsed?.data);
    res.status(201).json({ message });
  } catch (error) {
    TreatErrors(error, res);
  }
};
