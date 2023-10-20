import { HttpException, HttpStatus } from '@nestjs/common'
import { extname } from 'path'

export const fileFilterHelper = (req: any, file: any, cb: any) => {
  if (file.mimetype.match(/\/(pdf)$/) && file.originalname !== '@empty') {
    cb(null, true)
  } else if (file.mimetype.match(/\/(jpeg)$/) && file.originalname !== '@empty') {
    cb(null, true)
  }
  else if (file.mimetype.match(/\/(png)$/) && file.originalname !== '@empty') {
    cb(null, true)
  }
  else if (file.originalname === '@empty') {
    cb(null, false)
  } else {
    cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false)
  }
}
