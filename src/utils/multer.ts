import multer from "multer";
import { Request } from "express";
import { BadRequestError } from "./errors";

const storage = multer.diskStorage({
  destination: __dirname + "/uploads",
  filename: (req: Request, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split("/")[1]
    );
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 10 }, // 5 MB limit
  fileFilter: (req: Request, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new BadRequestError("Only Images allowed!"));
    }
  },
});

export { upload };
