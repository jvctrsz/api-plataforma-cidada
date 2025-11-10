import { Request, Response } from "express";
import { TreatErrors } from "../../Utils/Errors/TreatErrors";
import { requestTotals } from "../../Services/Dashboards/requestTotals";

export const requests = async (req: Request, res: Response) => {
  try {
    const totals = await requestTotals();
    res.json(totals);
  } catch (error) {
    TreatErrors(error, res);
  }
};
