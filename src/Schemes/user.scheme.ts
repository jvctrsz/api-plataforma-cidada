import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import z from "zod";
import {
  celular,
  cpf,
  stringRequired,
  telefone,
} from "../Utils/Errors/Zod/validation";
import { exampleEmail, exampleString } from "./default.scheme";

extendZodWithOpenApi(z);

export const postUserScheme = z.object({
  nome: z.string(stringRequired).openapi({ example: "Fernando da Silva" }),
  email: z.email({ error: "Deve ser um email válido." }),
  cpf: cpf,
  celular: celular,
  telefone: telefone.optional(),
  senha: z.string(stringRequired).openapi({ example: "12345" }),
});

export const putUserScheme = z.object({
  nome: z.string(stringRequired).optional(),
  email: z.email({ error: "Deve ser um email válido." }).optional(),
  cpf: cpf.optional(),
  celular: celular.optional(),
  telefone: telefone.optional(),
});

export const putErrorScheme = z.array(
  z.object({
    error: z.string().openapi(exampleString),
  })
);
