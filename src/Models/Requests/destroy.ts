import { Request, Response } from "express";
import { CError } from "../../Utils/Errors/CError";
import { destroyRequest } from "../../Services/Request/destroyRequest";

export const destroy = async (req: Request, res: Response) => {
  try {
    const id = req.user_id;
    const message = await destroyRequest(Number(id));
    res.status(200).json({ message });
  } catch (error) {
    console.error(error);
    if (error instanceof CError)
      return res.status(error.status).json(error.data);
    res.status(500).json({ message: "Internal Server error!", error });
  }
};
