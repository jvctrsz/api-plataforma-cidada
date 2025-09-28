import { Request, Response } from "express";
import { RequestFields } from "../../Controller/types";
import { TreatErrors } from "../../Utils/Errors/TreatErrors";
import { zodParse } from "../../Utils/Functions/zodParse";
import { putRequestScheme } from "../../Schemes/request.scheme";
import { updateRequest } from "../../Services/Request/updateRequest";

export const update = async (
  req: Request<{}, {}, Partial<RequestFields>>,
  res: Response
) => {
  try {
    const { id } = req.params as { id: string };
    const parsed = zodParse(req, putRequestScheme);
    const message = updateRequest(Number(id), parsed?.data);
    res.status(201).json({ message });
  } catch (error) {
    TreatErrors(error, res);
  }
};
