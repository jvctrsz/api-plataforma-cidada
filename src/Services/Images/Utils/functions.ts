import { BadRequestError, CError } from "../../../Utils/Errors/CError";
import cloudinary from "../config";

export const removeFromCloudinary = async (ids: string[]) => {
  try {
    await Promise.all(ids.map((id) => cloudinary.uploader.destroy(id)));
  } catch (error) {
    throw new CError("Não foi possível deletar as imagens.", 422);
  }
};
