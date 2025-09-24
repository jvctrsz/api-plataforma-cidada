import { Request, Response } from "express";
import { UserType } from "../../Controller/types";
import { zodParse } from "../../Utils/Functions/zodParse";
import { CError } from "../../Utils/Errors/CError";
import { createUser } from "../../Services/Users/createUser";
import { authRegister } from "../../Services/Auth/authRegister";
import { postUserScheme } from "../../Schemes/user.scheme";

export const register = async (
  req: Request<{}, {}, UserType>,
  res: Response
) => {
  try {
    const parsed = zodParse(req, postUserScheme);
    const user = await createUser(parsed?.data);
    const message = await authRegister(user);
    res.status(201).json({ message });
  } catch (error) {
    console.error(error);
    if (error instanceof CError)
      return res.status(error.status).json(error.data);
    res.status(500).json({ message: "Internal Server error!", error });
  }
};
