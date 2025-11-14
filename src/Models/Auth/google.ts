import { Request, Response } from "express";
import { CError } from "../../Utils/Errors/CError";
import { zodParse } from "../../Utils/Functions/zodParse";
import { googleLoginScheme } from "../../Schemes/auth.scheme";
import { authGoogle } from "../../Services/Auth/authGoogle";

export const google = async (req: Request, res: Response) => {
  try {
    const parsed = zodParse(req, googleLoginScheme);
    const token = await authGoogle(parsed?.data);
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    if (error instanceof CError)
      return res.status(error.status).json(error.data);
    res.status(500).json({ message: "Internal Server error!", error });
  }
};
