import { NextFunction, Request, Response } from "express";
import { CError } from "../../Utils/Errors/CError";
import { verifyToken } from "../../Utils/Functions/verifyToken";

interface TokenProps {
  id: number;
  role: string;
  iat: number;
  exp: number;
}

export const authToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const hash = process.env.LOGIN_JWT_SECRET;
    if (!hash) throw new CError({ message: "Internal Server Error!" }, 500);

    const { authorization } = req.headers;
    if (!authorization) throw new CError({ error: "Token não recebido" }, 401);

    const [, token] = authorization.split(" ");

    const decoded = await verifyToken(token, hash);
    const { id, role } = decoded as TokenProps;
    req.user_id = id;
    req.role = role;
    next();
  } catch (error) {
    if (error instanceof CError)
      return res.status(error.status).json(error.data);
    res.status(500).json({ message: "Internal Server error!", error });
  }
};
