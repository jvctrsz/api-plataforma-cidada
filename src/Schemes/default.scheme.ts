import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import z from "zod";
extendZodWithOpenApi(z);

export const tokenExample =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzU4NDk3NTUyLCJleHAiOjE3NTg0OTgxNTJ9.5VYrZJXFB-P2WaHAsKUrC1tot8HSwrHdG4UNYJcYdGQ";

export const serverScheme = z.object({
  message: z.string().openapi({ example: "Internal Server Error!" }),
});

export const unauthorizedScheme = z.object({
  error: z.string().openapi({ example: "Token não recebido." }),
});

export const idParams = z.object({ id: z.string().openapi({ example: 1 }) });
export const tokenParams = z.object({
  token: z.string().openapi({ example: tokenExample }),
});

export const exampleString = { example: "deve ser uma string." };
export const exampleEmail = { example: "Deve ser um email válido." };

export const unauthorized = {
  description: "Token não recebido",
  content: {
    "application/json": { schema: unauthorizedScheme },
  },
};

export const internalError = {
  description: "Internal Server Error",
  content: {
    "application/json": {
      schema: serverScheme,
    },
  },
};
