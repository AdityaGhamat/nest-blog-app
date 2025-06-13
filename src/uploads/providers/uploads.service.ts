import { Injectable } from '@nestjs/common';
import { Express } from 'express';
@Injectable()
export class UploadsService {
  public async uploadFile(file: Express.Multer.File) {
    //Upload to s3 bucket
    //Generate nwe entry in database
  }
}
