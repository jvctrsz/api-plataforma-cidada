import z from "zod";

const zString = z.string();

export const totalRequestScheme = z.object({
  total: zString.openapi({ example: 6 }),
  criadas: zString.openapi({ example: 5 }),
  andamento: zString.openapi({ example: 0 }),
  pendente: zString.openapi({ example: 0 }),
  finalizado: zString.openapi({ example: 1 }),
});
