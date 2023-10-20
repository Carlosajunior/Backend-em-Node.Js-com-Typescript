import { ManagedUpload } from "aws-sdk/clients/s3";
import { datatype } from "faker";

export const mockUploadResponse = (): ManagedUpload.SendData => ({
    Location: datatype.string(),
    ETag: datatype.string(),
    Key: datatype.string(),
    Bucket: datatype.string(),
})