import { Request, Response } from "express";
import { zodParse } from "../../Utils/Functions/zodParse";
import { CError } from "../../Utils/Errors/CError";
import { RequestFields } from "../../Controller/types";
import { postRequestScheme } from "../../Schemes/request.scheme";
import { createRequest } from "../../Services/Request/createRequest";

export const store = async (
  req: Request<{}, {}, RequestFields>,
  res: Response
) => {
  try {
    const id = req.user_id;
    const parsed = zodParse(req, postRequestScheme);
    const message = await createRequest(Number(id), parsed?.data);
    res.status(201).json({ message });
  } catch (error) {
    console.error(error);
    if (error instanceof CError)
      return res.status(error.status).json(error.data);
    res.status(500).json({ message: "Internal Server error!", error });
  }
};
