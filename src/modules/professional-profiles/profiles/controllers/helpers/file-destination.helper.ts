import { v4 as uuid } from 'uuid'
import { extname } from 'path'

export const fileDestinationHelper = (req: any, file: any, cb: any) => {
  cb(null, `${uuid()}${extname(file.originalname)}`)
}
