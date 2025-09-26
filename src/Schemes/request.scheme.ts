import z from "zod";
import { stringRequired } from "../Utils/Errors/Zod/validation";

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

export const postRequestScheme = z.object({
  codigo: z
    .string(stringRequired)
    .max(4, "deve ter no máximo 4 caracteres.")
    .openapi({ example: 1 }),
  endereco: z
    .string(stringRequired)
    .max(150, "deve ter no máximo 150 caracteres.")
    .openapi({ example: "xaxins" }),
  numero: z
    .string(stringRequired)
    .max(10, "deve ter no máximo 10 caracteres.")
    .openapi({ example: "150" }),
  referencia: z
    .string(stringRequired)
    .max(100, "deve ter no máximo 100 caracteres.")
    .optional()
    .openapi({ example: "perto da casa muro azul" }),
  bairro: z
    .string(stringRequired)
    .max(100, "deve ter no máximo 100 caracteres.")
    .openapi({ example: "violetas" }),
  cidade: z
    .string(stringRequired)
    .max(100, "deve ter no máximo 100 caracteres.")
    .openapi({ example: "sinop-mt" }),
  uf: z
    .string(stringRequired)
    .max(2, "deve ter no máximo 2 caracteres.")
    .openapi({ example: "MT" }),
  cep: cep,
  descricao: z
    .string(stringRequired)
    .max(180, "deve ter no máximo 180 caracteres.")
    .openapi({ example: "Luz do poste está queimada" }),
  observacao: z
    .string(stringRequired)
    .max(500, "deve ter no máximo 500 caracteres.")
    .optional()
    .openapi({
      example: "Esta queimada a um mês, e ja queimou três vezes este ano.",
    }),
  secretaria_id: z.string(stringRequired).openapi({ example: "1" }),
  usuarios_id: z.string(stringRequired).openapi({ example: "1" }),
});
