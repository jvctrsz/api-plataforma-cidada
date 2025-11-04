import multer from "multer";

const upload = multer({
  dest: "uploads/",
  limits: { files: 5 },
});

export default upload;
