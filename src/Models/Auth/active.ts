import { Request, Response } from "express";
import { CError } from "../../Utils/Errors/CError";
import { verifyToken } from "../../Utils/Functions/verifyToken";
import { authActive } from "../../Services/Auth/authActive";

export const active = async (req: Request, res: Response) => {
  try {
    const hash = process.env.LOGIN_JWT_SECRET;
    const { token } = req.params;
    const decoded = await verifyToken(token, hash!);
    const { id } = decoded as { id: number };
    const message = await authActive(id);
    res.status(200).json({ message });
  } catch (error) {
    console.error(error);
    if (error instanceof CError)
      return res.status(error.status).json(error.data);
    res.status(500).json({ message: "Internal Server error!", error });
  }
};
