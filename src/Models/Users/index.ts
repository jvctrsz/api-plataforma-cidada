import { Request, Response } from "express";
import { UserType } from "../../Controller/types";
import { CError } from "../../Utils/Errors/CError";
import { indexUsers } from "../../Services/Users/indexUsers";

export const index = async (req: Request<{}, {}, UserType>, res: Response) => {
  try {
    const users = await indexUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    if (error instanceof CError)
      return res.status(error.status).json(error.data);
    res.status(500).json({ message: "Internal Server error!", error });
  }
};
