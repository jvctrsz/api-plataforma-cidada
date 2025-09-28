import { Request, Response } from "express";
import { showRequests } from "../../Services/Request/showRequests";
import { TreatErrors } from "../../Utils/Errors/TreatErrors";

export const show = async (req: Request, res: Response) => {
  try {
    const id = req.user_id;
    const request = await showRequests(Number(id));
    res.status(200).json(request);
  } catch (error) {
    console.error(error);
    TreatErrors(error, res);
  }
};
