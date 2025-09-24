import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import z from "zod";
import {
  celular,
  cpf,
  email,
  stringRequired,
  telefone,
} from "../Utils/Errors/Zod/validation";
import { exampleString } from "./default.scheme";

extendZodWithOpenApi(z);

export const postUserScheme = z.object({
  nome: z.string(stringRequired).openapi({ example: "Fernando da Silva" }),
  email: z.email({ error: "Deve ser um email válido." }),
  cpf: cpf,
  celular: celular,
  telefone: telefone.optional(),
  senha: z.string(stringRequired).openapi({ example: "12345" }),
});

export const getUserScheme = z.object({
  id: z.string().openapi({ example: 3 }),
  nome: z.string().openapi({ example: "Fernando da Silva" }),
  email: z.email().openapi({ example: "test2e@gmail.com" }),
  cpf: z.email().openapi({ example: "000.000.000-00" }),
  celular: z.string().openapi({ example: "(66) 99999-9999" }),
  telefone: z.string().openapi({ example: "(66) 9999-9999" }),
  role: z.string().openapi({ example: "usuario" }),
  criado_em: z.date().openapi({ example: "2025-09-20T02:40:59.540Z" }),
  valido: z.boolean(),
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

export const changeScheme = z.object({
  senha_atual: z.string(stringRequired).openapi({ example: "12345678" }),
  nova_senha: z.string(stringRequired).openapi({ example: "12345" }),
  confirma_senha: z.string(stringRequired).openapi({ example: "12345" }),
});

export const recoveryScheme = z.object({
  email: email,
});

export const redefineScheme = z.object({
  email: email,
  nova_senha: z.string(stringRequired).openapi({ example: "12345" }),
  confirma_senha: z.string(stringRequired).openapi({ example: "12345" }),
});
