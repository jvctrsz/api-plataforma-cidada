import z from "zod";
import { stringRequired } from "../Utils/Errors/Zod/validation";
import { secretaria_id } from "./request.scheme";

const defaultScheme = {
  nome: z.string(stringRequired),
  secretaria_id: secretaria_id,
};

export const postCategoriesScheme = z.object(defaultScheme);
