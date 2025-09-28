import { Request, Response } from "express";
import { RequestsTypes } from "../../Controller/types";
import { TreatErrors } from "../../Utils/Errors/TreatErrors";
import { zodParse } from "../../Utils/Functions/zodParse";
import { statusRequestScheme } from "../../Schemes/request.scheme";
import { statusRequest } from "../../Services/Request/statusRequest";

export const status = async (
  req: Request<{}, {}, RequestsTypes>,
  res: Response
) => {
  try {
    const { id } = req.params as { id: string };
    const parsed = zodParse(req, statusRequestScheme);
    const message = await statusRequest(Number(id), parsed.data);
    res.json({ message });
  } catch (error) {
    TreatErrors(error, res);
  }
};
