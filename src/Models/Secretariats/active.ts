import { Request, Response } from "express";
import { CError } from "../../Utils/Errors/CError";
import { changeStatusSecretariats } from "../../Services/Secretariats/changeStatusSecretariats";

export const active = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const message = await changeStatusSecretariats(Number(id), "ativar");
    res.json({ message });
  } catch (error) {
    console.error(error);
    if (error instanceof CError)
      return res.status(error.status).json(error.data);
    res.status(500).json({ message: "Internal Server error!", error });
  }
};
