import { Request, Response } from "express";
import { CError } from "../../Utils/Errors/CError";
import { zodParse } from "../../Utils/Functions/zodParse";
import { authLogin } from "../../Services/Auth/authLogin";
import { loginScheme } from "../../Schemes/auth.scheme";

export interface LoginType {
  email: string;
  senha: string;
}

export const login = async (req: Request<{}, {}, LoginType>, res: Response) => {
  try {
    const parsed = zodParse(req, loginScheme);
    const token = await authLogin(parsed?.data);
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    if (error instanceof CError)
      return res.status(error.status).json(error.data);
    res.status(500).json({ message: "Internal Server error!", error });
  }
};
