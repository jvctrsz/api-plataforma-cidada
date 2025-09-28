import { Request, Response } from "express";
import { destroyRequest } from "../../Services/Request/destroyRequest";
import { TreatErrors } from "../../Utils/Errors/TreatErrors";

export const destroy = async (req: Request, res: Response) => {
  try {
    const id = req.user_id;
    const message = await destroyRequest(Number(id));
    res.status(200).json({ message });
  } catch (error) {
    TreatErrors(error, res);
  }
};
