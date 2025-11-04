import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { files: 5 },
});

export default upload;
