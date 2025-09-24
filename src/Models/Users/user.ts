import { Request, Response } from "express";
import { CError } from "../../Utils/Errors/CError";
import { dataUser } from "../../Services/Users/dataUser";

export const user = async (req: Request, res: Response) => {
  try {
    const id = req.user_id;
    const user = await dataUser(id);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    if (error instanceof CError)
      return res.status(error.status).json(error.data);
    res.status(500).json({ message: "Internal Server error!", error });
  }
};
