import { Request, Response } from "express";
import { zodParse } from "../../Utils/Functions/zodParse";
import { postSecretariatsScheme } from "../../Schemes/secretariats.scheme";
import { SecretariatsType } from "../../Controller/types";
import { createSecretariats } from "../../Services/Secretariats/createSecretariats";
import { TreatErrors } from "../../Utils/Errors/TreatErrors";

export const store = async (
  req: Request<{}, {}, SecretariatsType>,
  res: Response
) => {
  try {
    const parsed = zodParse(req, postSecretariatsScheme);
    const message = await createSecretariats(parsed?.data);
    res.status(201).json({ message });
  } catch (error) {
    TreatErrors(error, res);
  }
};
