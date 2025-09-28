import { Request, Response } from "express";
import { zodParse } from "../../Utils/Functions/zodParse";
import { RequestFields } from "../../Controller/types";
import { postRequestScheme } from "../../Schemes/request.scheme";
import { createRequest } from "../../Services/Request/createRequest";
import { TreatErrors } from "../../Utils/Errors/TreatErrors";

export const store = async (
  req: Request<{}, {}, RequestFields>,
  res: Response
) => {
  try {
    const id = req.user_id;
    const parsed = zodParse(req, postRequestScheme);
    const message = await createRequest(Number(id), parsed?.data);
    res.status(201).json({ message });
  } catch (error) {
    console.error(error);
    TreatErrors(error, res);
  }
};
