import z from "zod";

export const defaultOKStatus = (message: string) => ({
  description: message,
  content: {
    "application/json": {
      schema: z.object({
        message: z.string().openapi({ example: message + "." }),
      }),
    },
  },
});

export const defaultError = (message: string) => ({
  description: message,
  content: {
    "application/json": {
      schema: z.object({
        error: z.string().openapi({ example: message + "." }),
      }),
    },
  },
});
