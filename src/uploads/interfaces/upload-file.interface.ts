import { types } from 'util';
import { fileTypes } from '../enums/filetypes.enum';

export interface UploadFileInterface {
  name: string;
  path: string;
  type: fileTypes;
  mime: string;
  size: number;
}
