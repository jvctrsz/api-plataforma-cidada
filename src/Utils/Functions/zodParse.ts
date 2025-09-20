import { Request } from "express";
import { ZodObject, z } from "zod";
import { formatZodErrors } from "../Errors/Zod/zodErrors";
import { CError } from "../Errors/CError";

export const zodParse = <T extends ZodObject>(
  req: Request,
  validation: T
): { success: true; data: z.infer<T> } => {
  const parsed = validation.safeParse(req.body);
  if (parsed.error) throw new CError(formatZodErrors(parsed.error), 400);
  return parsed;
};
