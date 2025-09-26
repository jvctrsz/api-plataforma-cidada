import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import z from "zod";
import {
  celular,
  cpf,
  email,
  stringRequired,
  telefone,
} from "../Utils/Errors/Zod/validation";
import { exampleString, isoDateFormat } from "./default.scheme";

extendZodWithOpenApi(z);

const id = z.string(stringRequired).openapi({ example: 3 });
const nome = z
  .string(stringRequired)
  .max(100, "deve ter no máximo 100 caracteres.")
  .openapi({ example: "Fernando da Silva" });
const role = z.enum(["usuario", "funcionario", "admin"]);
const valido = z.boolean();
const senha = z.string(stringRequired).openapi({ example: "12345" });

export const postUserScheme = z.object({
  nome: nome,
  email: email,
  cpf: cpf,
  celular: celular,
  telefone: telefone.optional(),
  senha: senha,
});

export const getUserScheme = z.object({
  id: id,
  nome: nome,
  email: email,
  cpf: cpf,
  celular: celular,
  telefone: telefone,
  role: role,
  criado_em: isoDateFormat,
  valido: valido,
});

export const putUserScheme = z.object({
  nome: nome.optional(),
  email: email.optional(),
  cpf: cpf.optional(),
  celular: celular.optional(),
  telefone: telefone.optional(),
});

export const putErrorScheme = z.array(
  z.object({
    error: z.string().openapi(exampleString),
  })
);

const novasenha = z.string(stringRequired).openapi({ example: "12345" });

export const changeScheme = z.object({
  senha_atual: z.string(stringRequired).openapi({ example: "12345678" }),
  nova_senha: novasenha,
  confirma_senha: novasenha,
});

export const recoveryScheme = z.object({
  email: email,
});

export const redefineScheme = z.object({
  email: email,
  nova_senha: novasenha,
  confirma_senha: novasenha,
});

export const userScheme = z.object({
  id: id,
  nome: nome,
  email: email,
  cpf: cpf,
  celular: celular,
  telefone: telefone,
  role: role,
  google_id: z.string().openapi({ enum: [null, 1] }),
  criado_em: isoDateFormat,
});
