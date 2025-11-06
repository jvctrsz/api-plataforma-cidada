import { Request, Response } from "express";
import { indexRequests } from "../../Services/Request/indexRequest";
import { TreatErrors } from "../../Utils/Errors/TreatErrors";
import { zodParse } from "../../Utils/Functions/zodParse";
import { requestQueriesScheme } from "../../Schemes/request.scheme";

export const index = async (req: Request, res: Response) => {
  try {
    const queries = zodParse(req, requestQueriesScheme, true);
    const role = req.role;
    const id = req.user_id;
    const requests = await indexRequests(queries?.data, role, id);
    res.json(requests);
  } catch (error) {
    TreatErrors(error, res);
  }
};
