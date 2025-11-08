import { Request, Response } from "express";
import { TreatErrors } from "../../Utils/Errors/TreatErrors";
import { zodParse } from "../../Utils/Functions/zodParse";
import { postCategoriesScheme } from "../../Schemes/categories.scheme";
import { storeCategories } from "../../Services/Categories/storeCategories";

export const store = async (req: Request, res: Response) => {
  try {
    const parsed = zodParse(req, postCategoriesScheme);
    const message = await storeCategories(parsed?.data);
    res.status(201).json({ message });
  } catch (error) {
    TreatErrors(error, res);
  }
};
