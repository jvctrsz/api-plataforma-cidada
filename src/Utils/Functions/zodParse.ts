import { Request } from "express";
import { ZodObject, z } from "zod";
import { formatZodErrors } from "../Errors/Zod/zodErrors";
import { CError } from "../Errors/CError";

export const zodParse = <T extends ZodObject>(
  req: Request,
  validation: T,
  isQuery: boolean = false
): { success: true; data: z.infer<T> } => {
  const request = isQuery ? req.query : req.body;
  const parsed = validation.safeParse(request);
  if (parsed.error) throw new CError(formatZodErrors(parsed.error), 400);
  return parsed;
};
