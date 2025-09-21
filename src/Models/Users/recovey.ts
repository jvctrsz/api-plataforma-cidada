import { Request, Response } from "express";
import { UserType } from "../../Controller/types";
import { CError } from "../../Utils/Errors/CError";
import { object } from "zod";
import { email } from "../../Utils/Errors/Zod/validation";
import { recoveryUsers } from "../../Services/Users/recoveryUsers";
import { zodParse } from "../../Utils/Functions/zodParse";

const validation = object({
  email: email,
});

export const recovery = async (
  req: Request<{}, {}, UserType>,
  res: Response
) => {
  try {
    const parsed = zodParse<typeof validation>(req, validation);
    const message = await recoveryUsers(parsed?.data);
    res.status(200).json({ message });
  } catch (error) {
    console.error(error);
    if (error instanceof CError)
      return res.status(error.status).json(error.data);
    res.status(500).json({ message: "Internal Server error!", error });
  }
};
