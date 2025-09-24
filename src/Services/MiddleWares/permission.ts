import { NextFunction, Request, Response } from "express";
import { CError } from "../../Utils/Errors/CError";

export const permission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const role = req.role;
    if (role === "usuario")
      throw new CError(
        { error: "Usuário não tem permissão para esta operação" },
        403
      );
    next();
  } catch (error) {
    console.error(error);
    if (error instanceof CError)
      return res.status(error.status).json(error.data);
    res.status(500).json({ message: "Internal Server error!", error });
  }
};
