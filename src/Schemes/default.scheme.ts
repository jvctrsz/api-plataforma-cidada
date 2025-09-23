import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import z from "zod";
extendZodWithOpenApi(z);

export const serverScheme = z.object({
  message: z.string().openapi({ example: "Internal Server Error!" }),
});
