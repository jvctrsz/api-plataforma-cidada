import z from "zod";
import { stringRequired } from "../Utils/Errors/Zod/validation";

export const postSecretariatsScheme = z.object({
  nome: z.string(stringRequired).openapi({ example: "Secretaria de saúde" }),
});

export const getSecretariatsScheme = z.object({
  id: z.string(stringRequired).openapi({ example: 1 }),
  nome: z.string(stringRequired).openapi({ example: "Secretaria de saúde" }),
  ativo: z.string(stringRequired).openapi({ example: true }),
});
