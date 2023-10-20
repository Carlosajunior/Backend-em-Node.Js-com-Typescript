import { Request } from 'express';
import { FileFilterCallback } from 'multer';

export const fileFilterHelper = (
  _: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (file.originalname === '@empty') {
    cb(null, false);
  } else {
    cb(null, true);
  }
};
