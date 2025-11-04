import { Request, Response } from "express";
import { TreatErrors } from "../../Utils/Errors/TreatErrors";
import { getImages } from "../../Services/Images/getImages";

export const showImages = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const request = await getImages(Number(id));
    res.status(200).json(request);
  } catch (error) {
    console.error(error);
    TreatErrors(error, res);
  }
};
