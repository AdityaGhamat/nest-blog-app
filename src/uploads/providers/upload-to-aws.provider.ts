import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import * as path from 'path';
import { timestamp } from 'rxjs';
import { v4 as uuid } from 'uuid';
@Injectable()
export class UploadToAwsProvider {
  constructor(
    /**
     * Injecting Config Service
     */
    private readonly configService: ConfigService,
  ) {}

  public async fileUpload(file: Express.Multer.File) {
    const s3 = new S3();
    let uploadResult;
    try {
      uploadResult = await s3
        .upload({
          Bucket: this.configService.get('appConfig.awsBucketName'),
          Body: file.buffer,
          Key: this.generateFileName(file),
          ContentType: file.mimetype,
        })
        .promise();
    } catch (error) {
      throw new BadRequestException(error, {
        description: 'Failed to upload file',
      });
    }
    return uploadResult.Key;
  }
  private generateFileName(file: Express.Multer.File) {
    //Extract the flie name
    let name = file.originalname.split('.')[0];
    //Remove white spaces
    name.replace(/\s/g, '').trim();
    //Extract the extensions
    let extension = path.extname(file.originalname);
    //generate the tiemstamp
    let timestamp = new Date().getTime().toString().trim();
    //return file uuid
    return `${name}-${timestamp}-${uuid()}${extension}`;
  }
}
