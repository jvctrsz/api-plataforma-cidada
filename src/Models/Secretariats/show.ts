import { Request, Response } from "express";
import { CError } from "../../Utils/Errors/CError";
import { showSecretariats } from "../../Services/Secretariats/showSecretariats";

export const show = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const secretariat = await showSecretariats(Number(id));
    res.status(200).json(secretariat);
  } catch (error) {
    console.error(error);
    if (error instanceof CError)
      return res.status(error.status).json(error.data);
    res.status(500).json({ message: "Internal Server error!", error });
  }
};
