import { Request, Response } from "express";
import { destroyUser } from "../../Services/Users/destroyUser";
import { TreatErrors } from "../../Utils/Errors/TreatErrors";

export const destroy = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const message = await destroyUser(Number(id));
    res.status(200).json({ message });
  } catch (error) {
    TreatErrors(error, res);
  }
};
