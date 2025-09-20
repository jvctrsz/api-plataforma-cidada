import { string } from "zod";

export const stringRequired = { error: "deve ser uma string." };
export const celular = string(stringRequired).regex(/^\(\d{2}\) \d{5}-\d{4}$/, {
  error: "deve ser no formato (99) 99999-9999.",
});
export const telefone = string(stringRequired).regex(
  /^\(\d{2}\) \d{4}-\d{4}$/,
  {
    error: "deve ser no formato (99) 9999-9999.",
  }
);
export const cpf = string(stringRequired).regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
  error: "deve ser no formato 000.000.000-45.",
});
