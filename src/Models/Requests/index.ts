import { Request, Response } from "express";
import { indexRequests } from "../../Services/Request/indexRequest";
import { TreatErrors } from "../../Utils/Errors/TreatErrors";

export const index = async (req: Request, res: Response) => {
  try {
    const requests = await indexRequests();
    res.json(requests);
  } catch (error) {
    TreatErrors(error, res);
  }
};
