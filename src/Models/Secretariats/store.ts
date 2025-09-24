import { Request, Response } from "express";
import { zodParse } from "../../Utils/Functions/zodParse";
import { CError } from "../../Utils/Errors/CError";
import { postSecretariatsScheme } from "../../Schemes/secretariats.scheme";
import { SecretariatsType } from "../../Controller/types";
import { createSecretariats } from "../../Services/Secretariats/createSecretariats";

export const store = async (
  req: Request<{}, {}, SecretariatsType>,
  res: Response
) => {
  try {
    const parsed = zodParse(req, postSecretariatsScheme);
    const message = await createSecretariats(parsed?.data);
    res.status(201).json({ message });
  } catch (error) {
    console.error(error);
    if (error instanceof CError)
      return res.status(error.status).json(error.data);
    res.status(500).json({ message: "Internal Server error!", error });
  }
};
