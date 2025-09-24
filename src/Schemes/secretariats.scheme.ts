import z from "zod";
import { stringRequired } from "../Utils/Errors/Zod/validation";

export const postSecretariatsScheme = z.object({
  nome: z.string(stringRequired).openapi({ example: "Secretaria de saúde" }),
});
