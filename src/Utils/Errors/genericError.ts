import { Response } from "express";

export const genericError = (error: Error | unknown, res: Response) => {
  console.error(error);
  return res.status(500).json({ message: "Internal Server error!", error });
};
