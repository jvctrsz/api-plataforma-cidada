import { Request, Response } from "express";
import { CError } from "../../Utils/Errors/CError";
import { indexRequests } from "../../Services/Request/indexRequest";

export const index = async (req: Request, res: Response) => {
  try {
    const requests = await indexRequests();
    res.json(requests);
  } catch (error) {
    console.error(error);
    if (error instanceof CError)
      return res.status(error.status).json(error.data);
    res.status(500).json({ message: "Internal Server error!", error });
  }
};
