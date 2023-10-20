import { HttpException, HttpStatus } from '@nestjs/common'
import { extname } from 'path'

// Multer configuration
export const multerConfig = {
  dest: 'files'
}

// Multer upload options
export const multerOptions = {
  // Enable file size limits
  limits: {
    fileSize: 20971520
  },
  // Check the mimetypes to allow for upload
  fileFilter: (req: any, file: any, cb: any) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      // Allow storage of file
      cb(null, true)
    } else {
      // Reject file
      cb(
        new HttpException(
          `Tipo de arquivo não permitido ${extname(file.originalname)}`,
          HttpStatus.BAD_REQUEST
        ),
        false
      )
    }
  },
}

export const multerPhotoOptions = {
  // Enable file size limits
  limits: {
    fileSize: 5242880
  },
  // Check the mimetypes to allow for upload
  fileFilter: (req: any, file: any, cb: any) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      // Allow storage of file
      cb(null, true)
    } else {
      // Reject file
      cb(
        new HttpException(
          `Tipo de arquivo não permitido ${extname(file.originalname)}`,
          HttpStatus.BAD_REQUEST
        ),
        false
      )
    }
  },
}
