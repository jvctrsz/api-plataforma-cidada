import { Request, Response } from "express";
import { zodParse } from "../../Utils/Functions/zodParse";
import { CError } from "../../Utils/Errors/CError";
import { UserType } from "../../Controller/types";
import { createUser } from "../../Services/Users/createUser";
import { postUserScheme } from "../../Schemes/user.scheme";

export const store = async (req: Request<{}, {}, UserType>, res: Response) => {
  try {
    const parsed = zodParse<typeof postUserScheme>(req, postUserScheme);
    const user = await createUser(parsed?.data);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    if (error instanceof CError)
      return res.status(error.status).json(error.data);
    res.status(500).json({ message: "Internal Server error!", error });
  }
};
