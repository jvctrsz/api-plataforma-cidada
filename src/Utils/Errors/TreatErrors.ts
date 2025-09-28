import { Response } from "express";
import { CError } from "./CError";

export const TreatErrors = (error: any, res: Response) => {
  console.error(error);
  if (error instanceof CError) return res.status(error.status).json(error.data);
  return res.status(500).json({ message: "Internal Server error!", error });
};
