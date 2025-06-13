import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiHeader } from '@nestjs/swagger';
import { Express } from 'express';
import { UploadsService } from './providers/uploads.service';
@Controller('uploads')
export class UploadsController {
  constructor(
    /**
     * Injecting upload service
     */
    private readonly uploadService: UploadsService,
  ) {}
  @UseInterceptors(FileInterceptor('file'))
  @Post('file')
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.uploadFile(file);
  }
}
