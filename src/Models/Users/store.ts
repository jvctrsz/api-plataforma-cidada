import { Request, Response } from "express";
import { string, email, object } from "zod";
import { zodParse } from "../../Utils/Functions/zodParse";
import { CError } from "../../Utils/Errors/CError";
import { stringRequired } from "../../Utils/Errors/Zod/stringRequired";
import { UserType } from "../../Controller/Users/types";
import { createUser } from "../../Services/Users/createUser";

const validation = object({
  nome: string(stringRequired),
  email: email({ error: "Deve ser um email válido." }),
  cpf: string(stringRequired),
  celular: string(stringRequired).max(13),
  telefone: string(stringRequired).max(13).optional(),
  senha: string(stringRequired).optional(),
});
type teste = typeof validation;
export const store = async (req: Request<{}, {}, UserType>, res: Response) => {
  try {
    const parsed = zodParse<teste>(req, validation);
    createUser(parsed?.data);
  } catch (error) {
    if (error instanceof CError)
      return res.status(error.status).json(error.data);
    res.status(500).json({ message: "Internal Server error!", error });
  }
};
