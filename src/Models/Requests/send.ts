import { Request, Response } from "express";
import { TreatErrors } from "../../Utils/Errors/TreatErrors";
import { zodParse } from "../../Utils/Functions/zodParse";
import { postMessagesScheme } from "../../Schemes/request.scheme";
import { sendRequest } from "../../Services/Request/sendRequest";

export const send = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user_id = req.user_id;
    const role = req.role;
    const parsed = zodParse(req, postMessagesScheme);
    const message = await sendRequest(Number(id), parsed?.data, user_id, role);
    res.status(201).json({ message });
  } catch (error) {
    TreatErrors(error, res);
  }
};
