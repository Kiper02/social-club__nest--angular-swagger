import { Injectable, InternalServerErrorException, UploadedFile } from '@nestjs/common';
import * as uuid from 'uuid';
import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';

export enum EFileType {
  IMAGE = 'image',
  VIDEO = 'video',
  SOUND = 'sound',
}

@Injectable()
export class FileService {
  async saveFile(file: multer.File, fileType: EFileType) {
    try {
      const fullFileName = file.originalname;
      const fileExtension = fullFileName.split('.')[1];
      const fileName = `${uuid.v4()}.${fileExtension}`;
      const filePath = path.join(__dirname, '..', 'dist', 'static', fileType);
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath);
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch (error) {
        throw new InternalServerErrorException('Ошибка при записи файла')
    }
  }
}
