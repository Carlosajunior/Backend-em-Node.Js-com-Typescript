import { BadRequestException, Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class UploadService {
  AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;
  s3 = new AWS.S3
  ({
      accessKeyId: process.env.AWS_S3_ACCESS_KEY,
      secretAccessKey: process.env.AWS_S3_KEY_SECRET,
  });

  async uploadFile(file, profile_id?: string) {
    const { originalname } = file;

    return await this.s3_upload(
      file.buffer,
      this.AWS_S3_BUCKET,
      originalname,
      file.mimetype,
      profile_id
    );
  }

  async deleteFile(name, uuid?: string){
    const key = uuid ? `${uuid}/` + String(name) : String(name)
    return await this.s3_delete(this.AWS_S3_BUCKET, key)
  }

  async s3_upload(file, bucket, name, mimetype, uuid) {
    const params = {
      Bucket: bucket,
      Key: uuid ? `${uuid}/` + String(name) : String(name),
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'us-east-1'
      }
    };

    try {
      const s3Response = await this.s3.upload(params).promise();
      return s3Response;
    } catch (e) {
      throw new BadRequestException(
        'Falha ao fazer o upload dos arquivos ao S3.'
      );
    }
  }

  async s3_delete(bucket, key){
    const params = {
      Bucket: bucket,
      Key: key
    }
    try {
      await this.s3.deleteObject(params).promise()
    } catch (error) {
      throw new BadRequestException(
        'Falha ao deletar arquivo do S3.'
      );
    }
  }
}
