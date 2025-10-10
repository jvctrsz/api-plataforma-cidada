import { Request, Response } from "express";
import { TreatErrors } from "../../Utils/Errors/TreatErrors";
import { messagesRequests } from "../../Services/Request/messagesRequest";

export const messages = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user_id = req.user_id;
    const role = req.role;
    const messages = await messagesRequests(Number(id), user_id, role);
    res.json(messages);
  } catch (error) {
    TreatErrors(error, res);
  }
};
