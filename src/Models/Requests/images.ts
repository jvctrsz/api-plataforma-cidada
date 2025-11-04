import { Request, Response } from "express";
import { TreatErrors } from "../../Utils/Errors/TreatErrors";
import { zodParse } from "../../Utils/Functions/zodParse";

export const images = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const files = req.files;
    console.log(files);
    const message = "";
    res.status(201).json({ message });
  } catch (error) {
    TreatErrors(error, res);
  }
};
