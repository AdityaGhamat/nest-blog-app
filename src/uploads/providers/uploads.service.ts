import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Express } from 'express';
import { Upload } from '../upload.entity';
import { Repository } from 'typeorm';
import { UploadToAwsProvider } from './upload-to-aws.provider';
import { ConfigService } from '@nestjs/config';
import { UploadFileInterface } from '../interfaces/upload-file.interface';
import { fileTypes } from '../enums/filetypes.enum';
@Injectable()
export class UploadsService {
  constructor(
    /**
     * Inject uploadToAwsProvider
     */
    private readonly uploadToAwsProvider: UploadToAwsProvider,
    /**
     * injecting config service
     */
    private readonly configService: ConfigService,
    /**
     * Injecting upploads repostiory
     */
    @InjectRepository(Upload)
    private readonly uploadRepository: Repository<Upload>,
  ) {}
  public async uploadFile(file: Express.Multer.File) {
    try {
      //throw error for not supporting mime types
      if (
        !['image/gif', 'image/jpg', 'image/jpeg', 'image/png'].includes(
          file.mimetype,
        )
      ) {
        throw new BadRequestException('Mime type not supported');
      }
      //Upload to s3 bucket
      const name = await this.uploadToAwsProvider.fileUpload(file);
      const uploadFile: UploadFileInterface = {
        name: name,
        path: `https://${this.configService.get('appConfig.awsCloudFrontUrl')}/${name}`,
        type: fileTypes.IMAGE,
        mime: file.mimetype,
        size: file.size,
      };

      //Generate nwe entry in database
      const upload = this.uploadRepository.create(uploadFile);
      return await this.uploadRepository.save(upload);
    } catch (error) {
      throw new ConflictException(error);
    }
  }
}
