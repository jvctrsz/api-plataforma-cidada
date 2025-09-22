import { Request, Response } from "express";
import { CError } from "../../Utils/Errors/CError";
import { destroyUser } from "../../Services/Users/destroyUser";

export const destroy = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const message = await destroyUser(Number(id));
    res.status(200).json({ message });
  } catch (error) {
    console.error(error);
    if (error instanceof CError) {
      res.status(error.status).json(error.data);
    }
    res.status(500).json({ message: "Internal Server Error!", error });
  }
};
