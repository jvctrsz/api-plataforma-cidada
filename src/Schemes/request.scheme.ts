import z from "zod";
import { stringRequired } from "../Utils/Errors/Zod/validation";
import { isoDateFormat } from "./default.scheme";

export const requesStatusEnum = [
  "criado",
  "pendente",
  "andamento",
  "finalizado",
];

export const priorityEnum = z.enum(["baixa", "normal", "alta"], {
  error: 'deve ser "baixa", "normal" ou "alta".',
});

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

const prioridade = priorityEnum.optional();

export const secretaria_id = z.string(stringRequired).openapi({ example: "1" });
export const requestStatus = z.enum(
  ["criado", "pendente", "andamento", "finalizado"],
  {
    error: 'deve ser "criado", "pendente", "andamento" ou "finalizado".',
  }
);

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
  prioridade,
  categoria_id: secretaria_id,
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
  prioridade,
  categoria_id: secretaria_id.optional(),
});

export const getRequestScheme = z.object({
  id: secretaria_id,
  ...defaultRequestScheme,
  usuarios_id: secretaria_id,
  secretaria_id,
  status: requestStatus,
  criado_em: isoDateFormat,
  atualizado_em: isoDateFormat,
  protocolo: z.string().openapi({ example: "11/2025-uZaFne" }),
});

export const statusRequestScheme = z.object({ status: requestStatus });
export const secretariatRequestScheme = z.object({ secretaria_id });

const defaultMessageScheme = {
  mensagem: z
    .string(stringRequired)
    .openapi({ example: "confirma o nome da rua." }),
};

export const postMessagesScheme = z.object(defaultMessageScheme);
export const getMessagesScheme = z.object({
  ...defaultMessageScheme,
  solicitacao_id: secretaria_id,
  remetente_id: secretaria_id,
  destinatario_id: secretaria_id,
  id: secretaria_id,
  enviado_em: isoDateFormat,
});

export const queryStringError = z
  .string({
    error: "Query: deve ser uma string.",
  })
  .optional();

export const queryEnumError = z.enum(
  ["criado", "pendente", "andamento", "finalizado"],
  {
    error: 'Query: deve ser "criado", "pendente", "andamento" ou "finalizado".',
  }
);

export const queryPriorityEnum = z.enum(["baixa", "normal", "alta"], {
  error: 'Query: deve ser "baixa", "normal" ou "alta".',
});

export const requestQueriesScheme = z.object({
  funcionario_id: queryStringError,
  secretaria_id: queryStringError,
  categoria_id: queryStringError,
  status: queryEnumError.optional(),
  prioridade: queryPriorityEnum.optional(),
  protocolo: queryStringError.optional().openapi({ example: "11/2025-uZaFne" }),
});
