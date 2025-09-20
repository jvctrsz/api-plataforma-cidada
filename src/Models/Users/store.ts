import { Request, Response } from "express";
import { string, email, object } from "zod";
import { zodParse } from "../../Utils/Functions/zodParse";
import { CError } from "../../Utils/Errors/CError";
import {
  celular,
  stringRequired,
  telefone,
} from "../../Utils/Errors/Zod/validation";
import { UserType } from "../../Controller/types";
import { createUser } from "../../Services/Users/createUser";

const validation = object({
  nome: string(stringRequired),
  email: email({ error: "Deve ser um email válido." }),
  cpf: string(stringRequired),
  celular: celular,
  telefone: telefone.optional(),
  senha: string(stringRequired),
});
export const store = async (req: Request<{}, {}, UserType>, res: Response) => {
  try {
    const parsed = zodParse<typeof validation>(req, validation);
    const user = await createUser(parsed?.data);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    if (error instanceof CError)
      return res.status(error.status).json(error.data);
    res.status(500).json({ message: "Internal Server error!", error });
  }
};
