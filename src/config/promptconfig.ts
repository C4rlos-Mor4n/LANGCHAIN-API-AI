import multer, { FileFilterCallback } from "multer";
import path from "path";
import { fileURLToPath } from "url";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export const savePromptDocument = multer.diskStorage({
  destination: (_, _file, cb) => {
    cb(null, path.join(dirname, "..", "templates", "prompt_templates"));
  },

  //quitar espacios en blanco por guiones bajos
  filename: (_, file, cb) => {
    cb(null, file.originalname.trim().replace(/\s/g, "_"));
  },
});

export const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const allowedTypes = ["text/plain"];
  cb(null, allowedTypes.includes(file.mimetype));
};

export const upload = multer({
  storage: savePromptDocument,
  fileFilter: fileFilter as any,
});
