import { Request, Response } from "express";
import { zodParse } from "../../Utils/Functions/zodParse";
import { CError } from "../../Utils/Errors/CError";
import { UserType } from "../../Controller/types";
import { updateUser } from "../../Services/Users/updateUser";
import { putUserScheme } from "../../Schemes/user.scheme";

export const update = async (req: Request<{}, {}, UserType>, res: Response) => {
  try {
    const { id } = req.params as UserType;
    const parsed = zodParse(req, putUserScheme);
    const user = await updateUser(Number(id), parsed?.data);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    if (error instanceof CError)
      return res.status(error.status).json(error.data);
    res.status(500).json({ message: "Internal Server error!", error });
  }
};
