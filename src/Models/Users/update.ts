import { Request, Response } from "express";
import { string, email, object } from "zod";
import { zodParse } from "../../Utils/Functions/zodParse";
import { CError } from "../../Utils/Errors/CError";
import { stringRequired } from "../../Utils/Errors/Zod/stringRequired";
import { UserType } from "../../Controller/types";
import { updateUser } from "../../Services/Users/updateUser";

const validation = object({
  nome: string(stringRequired).optional(),
  email: email({ error: "Deve ser um email válido." }).optional(),
  cpf: string(stringRequired).optional(),
  celular: string(stringRequired).max(13).optional(),
  telefone: string(stringRequired).max(13).optional(),
});
export const update = async (req: Request<{}, {}, UserType>, res: Response) => {
  try {
    const { id } = req.params as UserType;
    const parsed = zodParse<typeof validation>(req, validation);
    const user = await updateUser(Number(id), parsed?.data);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    if (error instanceof CError)
      return res.status(error.status).json(error.data);
    res.status(500).json({ message: "Internal Server error!", error });
  }
};
