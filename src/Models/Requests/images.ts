import { Request, Response } from "express";
import { TreatErrors } from "../../Utils/Errors/TreatErrors";
import { storeImages } from "../../Services/Images/storeImages";

export const images = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const files = req.files;
    const message = await storeImages(Number(id), files ?? []);
    res.status(201).json({ message });
  } catch (error) {
    TreatErrors(error, res);
  }
};
