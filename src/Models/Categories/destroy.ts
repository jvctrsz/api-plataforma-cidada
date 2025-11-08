import { Request, Response } from "express";
import { destroyCategories } from "../../Services/Categories/destroyCategories";
import { TreatErrors } from "../../Utils/Errors/TreatErrors";

export const destroy = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const message = await destroyCategories(Number(id));
    res.status(200).json({ message });
  } catch (error) {
    TreatErrors(error, res);
  }
};
