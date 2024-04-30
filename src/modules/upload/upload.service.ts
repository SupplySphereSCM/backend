import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
} from '@aws-sdk/client-s3';

@Injectable()
export class UploadService {
  s3: S3Client;

  constructor(private configService: ConfigService) {
    this.s3 = new S3Client({
      region: this.configService.getOrThrow('file.awsS3Region'),
      credentials: {
        accessKeyId: this.configService.getOrThrow('file.apiKey'),
        secretAccessKey: this.configService.getOrThrow('file.apiSecret'),
      },
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const { originalname, buffer } = file;
    const bucketName = process.env.AWS_S3_BUCKET_NAME; // Ensure your bucket name is correct
    const params: PutObjectCommandInput = {
      Bucket: bucketName,
      Key: `${Date.now().toString()}-${originalname}`,
      Body: buffer,
      ACL: 'public-read', // Makes the file publicly readable
    };

    await this.s3.send(new PutObjectCommand(params));
    return `https://${bucketName}.s3.amazonaws.com/${params.Key}`;
  }

  async uploadFiles(files: Array<Express.Multer.File>): Promise<string[]> {
    return Promise.all(files.map((file) => this.uploadFile(file)));
  }
}
