import { Request, Response } from "express";
import { TreatErrors } from "../../Utils/Errors/TreatErrors";
import { zodParse } from "../../Utils/Functions/zodParse";
import { updateCategories } from "../../Services/Categories/updateCategories";
import { putCategoriesScheme } from "../../Schemes/categories.scheme";

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const parsed = zodParse(req, putCategoriesScheme);
    const message = await updateCategories(Number(id), parsed?.data);
    res.status(201).json({ message });
  } catch (error) {
    TreatErrors(error, res);
  }
};
