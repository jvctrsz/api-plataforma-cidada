import { Request, Response } from "express";
import { TreatErrors } from "../../Utils/Errors/TreatErrors";
import { showCategories } from "../../Services/Categories/showCategories";

export const show = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const categories = await showCategories(Number(id));
    res.status(200).json(categories);
  } catch (error) {
    TreatErrors(error, res);
  }
};
