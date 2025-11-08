import z from "zod";
import { stringRequired } from "../Utils/Errors/Zod/validation";
import { queryStringError, secretaria_id } from "./request.scheme";

const defaultScheme = {
  nome: z.string(stringRequired),
  secretaria_id: secretaria_id,
};

export const postCategoriesScheme = z.object(defaultScheme);

export const getCategoriesScheme = z.object({
  id: secretaria_id,
  ...defaultScheme,
  secretaria_nome: z.string(stringRequired).openapi({ example: "Saúde" }),
});

export const categoriesQueryScheme = z.object({
  nome: queryStringError,
  secretaria_id: queryStringError,
  secretaria_nome: queryStringError,
});
