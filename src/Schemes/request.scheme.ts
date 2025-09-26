import z from "zod";
import { stringRequired } from "../Utils/Errors/Zod/validation";
import { isoDateFormat } from "./default.scheme";

export const requesStatusEnum = [
  "criado",
  "pendente",
  "andamento",
  "finalizado",
];

export const cep = z
  .string(stringRequired)
  .regex(/^\d{5}-\d{3}$/, "deve ser no formato 00000-000.")
  .max(9, "deve ter no máximo 9 caracteres.");

const endereco = z
  .string(stringRequired)
  .max(150, "deve ter no máximo 150 caracteres.")
  .openapi({ example: "xaxins" });
const numero = z
  .string(stringRequired)
  .max(10, "deve ter no máximo 10 caracteres.")
  .openapi({ example: "150" });
const referencia = z
  .string(stringRequired)
  .max(100, "deve ter no máximo 100 caracteres.")
  .optional()
  .openapi({ example: "perto da casa muro azul" });
const bairro = z
  .string(stringRequired)
  .max(100, "deve ter no máximo 100 caracteres.")
  .openapi({ example: "violetas" });
const cidade = z
  .string(stringRequired)
  .max(100, "deve ter no máximo 100 caracteres.")
  .openapi({ example: "sinop-mt" });
const uf = z
  .string(stringRequired)
  .max(2, "deve ter no máximo 2 caracteres.")
  .openapi({ example: "MT" });
const descricao = z
  .string(stringRequired)
  .max(180, "deve ter no máximo 180 caracteres.")
  .openapi({ example: "Luz do poste está queimada" });
const observacao = z
  .string(stringRequired)
  .max(500, "deve ter no máximo 500 caracteres.")
  .optional()
  .openapi({
    example: "Esta queimada a um mês, e ja queimou três vezes este ano.",
  });

const secretaria_id = z.string(stringRequired).openapi({ example: "1" });
export const requestStatus = z.enum([
  "criado",
  "pendente",
  "andamento",
  "finalizado",
]);
const defaultRequestScheme = {
  endereco,
  numero,
  referencia,
  bairro,
  cidade,
  uf,
  cep,
  observacao,
  descricao,
  secretaria_id,
};

export const postRequestScheme = z.object(defaultRequestScheme);
export const putRequestScheme = z.object({
  endereco: endereco.optional(),
  numero: numero.optional(),
  referencia,
  bairro: bairro.optional(),
  cidade: cidade.optional(),
  uf: uf.optional(),
  cep: cep.optional(),
  observacao,
  descricao: descricao.optional(),
});

export const getRequestScheme = z.object({
  id: secretaria_id,
  ...defaultRequestScheme,
  usuarios_id: secretaria_id,
  status: requestStatus,
  criado_em: isoDateFormat,
  atualizado_em: isoDateFormat,
});
