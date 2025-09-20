import { ZodError } from "zod";

export const formatZodErrors = (error: ZodError | undefined) =>
  error?.issues.map((err) => {
    const field = err.path.length > 0 ? err.path.join(".") : "global";
    return { [field]: err.message };
  });
