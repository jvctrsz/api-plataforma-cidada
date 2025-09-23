import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import z from "zod";
import {
  celular,
  cpf,
  stringRequired,
  telefone,
} from "../Utils/Errors/Zod/validation";

extendZodWithOpenApi(z);

export const postUserScheme = z.object({
  nome: z.string(stringRequired).openapi({ example: "Fernando da Silva" }),
  email: z.email({ error: "Deve ser um email válido." }),
  cpf: cpf,
  celular: celular,
  telefone: telefone.optional(),
  senha: z.string(stringRequired).openapi({ example: "12345" }),
});
