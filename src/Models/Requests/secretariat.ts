import { Request, Response } from "express";
import { RequestFields } from "../../Controller/types";
import { TreatErrors } from "../../Utils/Errors/TreatErrors";
import { zodParse } from "../../Utils/Functions/zodParse";
import { secretariatRequestScheme } from "../../Schemes/request.scheme";
import { secretariatRequest } from "../../Services/Request/secretariatRequest";

export const secretariat = async (
  req: Request<{}, {}, RequestFields>,
  res: Response
) => {
  try {
    const { id } = req.params as { id: string };
    const parsed = zodParse(req, secretariatRequestScheme);
    const message = await secretariatRequest(Number(id), parsed?.data);
    res.json({ message });
  } catch (error) {
    TreatErrors(error, res);
  }
};
