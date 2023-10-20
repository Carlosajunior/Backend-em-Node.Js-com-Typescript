import { HttpException, HttpStatus } from '@nestjs/common'
import { extname } from 'path'

export const fileFilterHelper = (req: any, file: any, cb: any) => {
  if (file.mimetype.match(/\/(pdf)$/)) {
    cb(null, true)
  } else {
    cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false)
  }
}
