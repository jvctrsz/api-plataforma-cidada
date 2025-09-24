import { Request, Response } from "express";
import { CError } from "../../Utils/Errors/CError";
import { indexSecretariats } from "../../Services/Secretariats/indexSecretariats";

export const index = async (req: Request, res: Response) => {
  try {
    const secretariats = await indexSecretariats();
    res.status(200).json(secretariats);
  } catch (error) {
    console.error(error);
    if (error instanceof CError)
      return res.status(error.status).json(error.data);
    res.status(500).json({ message: "Internal Server error!", error });
  }
};
