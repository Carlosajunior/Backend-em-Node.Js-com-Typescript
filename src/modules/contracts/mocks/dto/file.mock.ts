import { datatype } from "faker";
import { Readable } from "stream";

export const mockMulterFile = (): Express.Multer.File => ({
    fieldname: datatype.string(),
    originalname: datatype.string(),
    encoding: datatype.string(),
    mimetype: datatype.string(),
    size: datatype.number(),
    destination: datatype.string(),
    filename: datatype.string(),
    path: datatype.string(),
    buffer: new Buffer(datatype.string()),
    stream: new Readable()
})