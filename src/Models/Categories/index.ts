import { Request, Response } from "express";
import { TreatErrors } from "../../Utils/Errors/TreatErrors";
import { zodParse } from "../../Utils/Functions/zodParse";
import { categoriesQueryScheme } from "../../Schemes/categories.scheme";
import { indexCategories } from "../../Services/Categories/indexCategories";

export const index = async (req: Request, res: Response) => {
  try {
    const queries = zodParse(req, categoriesQueryScheme, true);
    const categories = await indexCategories(queries?.data);
    res.status(200).json(categories);
  } catch (error) {
    TreatErrors(error, res);
  }
};
