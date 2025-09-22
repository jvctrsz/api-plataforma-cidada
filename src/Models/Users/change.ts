import { Request, Response } from "express";
import { CError } from "../../Utils/Errors/CError";
import { object, string } from "zod";
import { stringRequired } from "../../Utils/Errors/Zod/validation";
import { zodParse } from "../../Utils/Functions/zodParse";
import { changeUser } from "../../Services/Users/changeUser";

export interface ChangePassword {
  senha_atual: string;
  nova_senha: string;
  confirma_senha: string;
}

const validation = object({
  senha_atual: string(stringRequired),
  nova_senha: string(stringRequired),
  confirma_senha: string(stringRequired),
});

export const change = async (
  req: Request<{}, {}, ChangePassword>,
  res: Response
) => {
  try {
    const id = req.user_id;
    const parsed = zodParse<typeof validation>(req, validation);
    const message = await changeUser(Number(id), parsed.data);
    res.status(201).json({ message });
  } catch (error) {
    console.error(error);
    if (error instanceof CError)
      return res.status(error.status).json(error.data);
    res.status(500).json({ message: "Internal Server error!", error });
  }
};
