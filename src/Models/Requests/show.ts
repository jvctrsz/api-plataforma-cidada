import { Request, Response } from "express";
import { CError } from "../../Utils/Errors/CError";
import { showRequests } from "../../Services/Request/showRequests";

export const show = async (req: Request, res: Response) => {
  try {
    const id = req.user_id;
    const request = await showRequests(Number(id));
    res.status(201).json(request);
  } catch (error) {
    console.error(error);
    if (error instanceof CError)
      return res.status(error.status).json(error.data);
    res.status(500).json({ message: "Internal Server error!", error });
  }
};
