import { Request, Response } from "express";
import { UserType } from "../../Controller/types";
import { CError } from "../../Utils/Errors/CError";
import { showUsers } from "../../Services/Users/showUsers";

export const show = async (req: Request<UserType>, res: Response) => {
  try {
    const { id } = req.params;
    const user = await showUsers(Number(id));
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    if (error instanceof CError)
      return res.status(error.status).json(error.data);
    res.status(500).json({ message: "Internal Server error!", error });
  }
};
