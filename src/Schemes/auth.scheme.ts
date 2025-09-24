import z from "zod";
import { email, stringRequired } from "../Utils/Errors/Zod/validation";

export const loginScheme = z.object({
  email: email,
  senha: z.string(stringRequired).openapi({ example: "12345" }),
});
