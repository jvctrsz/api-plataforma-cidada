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
  .regex(/^\d{5}-?\d{3}$/, "deve ser no formato 00000-000.");

export const postRequestScheme = z.object({
  codigo: z.string(stringRequired).openapi({ example: 1 }),
  endereco: z.string(stringRequired).openapi({ example: "xaxins" }),
  numero: z.string(stringRequired).openapi({ example: "150" }),
  referencia: z
    .string(stringRequired)
    .optional()
    .openapi({ example: "perto da casa muro azul" }),
  bairro: z.string(stringRequired).openapi({ example: "violetas" }),
  cidade: z.string(stringRequired).openapi({ example: "sinop-mt" }),
  uf: z.string(stringRequired).openapi({ example: "MT" }),
  cep: cep,
  descricao: z
    .string(stringRequired)
    .openapi({ example: "Luz do poste está queimada" }),
  observacao: z.string(stringRequired).optional().openapi({
    example: "Esta queimada a um mês, e ja queimou três vezes este ano.",
  }),
  status: z.string(stringRequired).openapi({ enum: requesStatusEnum }),
  secretaria_id: z.string(stringRequired).openapi({ example: "1" }),
  usuarios_id: z.string(stringRequired).openapi({ example: "1" }),
});
