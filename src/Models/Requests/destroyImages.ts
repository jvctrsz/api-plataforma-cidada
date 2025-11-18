import { Request, Response } from "express";
import { TreatErrors } from "../../Utils/Errors/TreatErrors";
import { zodParse } from "../../Utils/Functions/zodParse";
import { deleteImagesScheme } from "../../Schemes/request.scheme";
import { deleteImages } from "../../Services/Images/deleteImages";

export const destroyImages = async (req: Request, res: Response) => {
  try {
    const parsed = zodParse(req, deleteImagesScheme);
    const message = await deleteImages(parsed?.data);
    res.json({ message });
  } catch (error) {
    TreatErrors(error, res);
  }
};
