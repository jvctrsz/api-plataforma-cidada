import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import z from "zod";
import { isValidCpf } from "../../Functions/isValidCpf";
extendZodWithOpenApi(z);

export const stringRequired = { error: "deve ser uma string." };
export const celular = z
  .string(stringRequired)
  .regex(/^\(\d{2}\) \d{5}-\d{4}$/, {
    error: "deve ser no formato (99) 99999-9999.",
  });
export const telefone = z
  .string(stringRequired)
  .regex(/^\(\d{2}\) \d{4}-\d{4}$/, {
    error: "deve ser no formato (99) 9999-9999.",
  });
export const cpf = z
  .string(stringRequired)
  .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
    error: "deve ser no formato 000.000.000-00.",
  })
  .refine(isValidCpf, "deve ser um cpf válido.");
export const email = z
  .email({ error: "deve ser um email válido." })
  .openapi({ example: "teste@gmail.com" });
