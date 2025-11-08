import z from "zod";
import { stringRequired } from "../Utils/Errors/Zod/validation";

export const postCategoriesScheme = z.object({
  nome: z.string(stringRequired),
});
