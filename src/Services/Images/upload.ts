import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { files: 5 },
});

export default upload;
