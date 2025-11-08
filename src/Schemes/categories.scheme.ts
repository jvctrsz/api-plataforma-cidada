import z from "zod";
import { stringRequired } from "../Utils/Errors/Zod/validation";
import { secretaria_id } from "./request.scheme";

export const postCategoriesScheme = z.object({
  nome: z.string(stringRequired),
  secretaria_id: secretaria_id,
});
