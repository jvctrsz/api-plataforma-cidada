import { Request, Response } from "express";
import { zodParse } from "../../Utils/Functions/zodParse";
import { UserType } from "../../Controller/types";
import { createUser } from "../../Services/Users/createUser";
import { postUserScheme } from "../../Schemes/user.scheme";
import { TreatErrors } from "../../Utils/Errors/TreatErrors";

export const store = async (req: Request<{}, {}, UserType>, res: Response) => {
  try {
    const parsed = zodParse<typeof postUserScheme>(req, postUserScheme);
    const user = await createUser(parsed?.data);
    res.status(201).json(user);
  } catch (error) {
    TreatErrors(error, res);
  }
};
