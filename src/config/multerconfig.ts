import multer, { FileFilterCallback } from "multer";
import path from "path";
import tmp from "tmp";

const tmpDir = tmp.dirSync({ unsafeCleanup: true });

export const storage = multer.diskStorage({
  destination: (_, _file, cb) => {
    cb(null, tmpDir.name);
  },
  filename: (_, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

export const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const allowedTypes = ["application/pdf", "text/plain"];
  cb(null, allowedTypes.includes(file.mimetype));
};

export const upload = multer({ storage, fileFilter: fileFilter as any });
