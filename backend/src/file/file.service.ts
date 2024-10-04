import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid'
import * as multer from 'multer'
import path from 'path'

export enum EFileType {
    IMAGE = 'image',
    VIDEO = 'video',
    SOUND = 'sound'
}

@Injectable()
export class FileService {

    async saveFile(file: multer.File, fileType: EFileType) {
        const fullFileName = file.originalname;
        const fileExtension = path.extname(fullFileName);
        const fileName = `${uuid.v4()}.${fileExtension}`;
        const filePath = path.join(__dirname, '..', 'static', fileType);
        await file.mv(filePath);
        return fileName;
    }
}
