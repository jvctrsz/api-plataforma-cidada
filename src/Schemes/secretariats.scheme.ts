import z from "zod";
import {
  celular,
  email,
  stringRequired,
  telefone,
} from "../Utils/Errors/Zod/validation";
import { cep, queryStringError } from "./request.scheme";
import { isoDateFormat } from "./default.scheme";

export const defaultSecretariatScheme = {
  nome: z
    .string(stringRequired)
    .max(150, "deve ter no máximo 150 caracteres.")
    .openapi({ example: "Secretaria de saúde" }),
  celular: celular.optional(),
  telefone: telefone.optional(),
  email: email.optional(),
  logradouro: z
    .string(stringRequired)
    .max(150, "deve ter no máximo 150 caracteres.")
    .openapi({ example: "xaxins" })
    .optional(),
  numero: z
    .string(stringRequired)
    .max(10, "deve ter no máximo 10 caracteres.")
    .openapi({ example: "10" })
    .optional(),
  cep: cep.optional(),
  bairro: z
    .string(stringRequired)
    .max(30, "deve ter no máximo 150 caracteres.")
    .openapi({ example: "jd violetas" })
    .optional(),
  cidade: z
    .string(stringRequired)
    .max(100, "deve ter no máximo 100 caracteres.")
    .openapi({ example: "sinop" })
    .optional(),
  uf: z
    .string(stringRequired)
    .max(2, "deve ter no máximo 2 caracteres.")
    .openapi({ example: "MT" })
    .optional(),
  descricao: z
    .string(stringRequired)
    .max(255, "deve ter no máximo 255 caracteres.")
    .openapi({ example: "descricao da secretaria" })
    .optional(),
  whatsapp: celular.optional(),
};

const secretario_id = z.string(stringRequired).openapi({ example: "1" });
const secretario_nome = z
  .string(stringRequired)
  .openapi({ example: "Fernando Da Silva" });

export const postSecretariatsScheme = z.object({
  ...defaultSecretariatScheme,
  secretario_id: secretario_id,
});

export const putSecretariatsScheme = z.object(defaultSecretariatScheme);
export const changeEmployeeScheme = z.object({ secretario_id });
export const getSecretariatsScheme = z.object({
  id: z.string(stringRequired).openapi({ example: 1 }),
  ativo: z.boolean(stringRequired).openapi({ example: true }),
  ...defaultSecretariatScheme,
  secretario_id: secretario_id,
  secretario_nome: secretario_nome,
  criado_em: isoDateFormat,
  atualizado_em: isoDateFormat,
});

export const queryDateError = z.iso
  .datetime("Query: deve ser no formato ISO.")
  .optional();

export const secretariatQueryScheme = z.object({
  secretario_id: queryStringError,
  secretario_nome: queryStringError,
  nome: queryStringError,
  celular: queryStringError,
  telefone: queryStringError,
  email: queryStringError,
  logradouro: queryStringError,
  numero: queryStringError,
  cep: queryStringError,
  bairro: queryStringError,
  cidade: queryStringError,
  uf: queryStringError,
  descricao: queryStringError,
  whatsapp: queryStringError,
  criado_em: queryDateError,
  atualizado_em: queryDateError,
});
