import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as multer from 'multer'
import { File } from 'src/file/file.model';
import { EFileType, FileService } from 'src/file/file.service';
import { Message } from './message.model';
import { CreateMessageDto } from './dto/create-message-dto';

@Injectable()
export class MessageService {
    constructor(
        @InjectModel(File) private fileRepository: typeof File,
        @InjectModel(Message) private messageRepository: typeof Message,
        private fileService: FileService
    ) {}

    async createMessage(createMessageDto: CreateMessageDto) {
        const message = await this.messageRepository.create(createMessageDto)
        return message;
    }

    async getMessagesByChatId(chatId: number) {
        const messages = await this.messageRepository.findAll({where: {chatId}})
        return messages;
    }

    async createFile(messageId: number, file: multer.File) {
        const fileName = await this.fileService.saveFile(file, EFileType.IMAGE)
        const image = await this.fileRepository.create({messageId, file: fileName})
        return image;
      }
    
    
      async getFileOneByMessageId(messageId: number) {
        const image = await this.fileRepository.findOne({where: {messageId}})
        return image;
      }
    
      async getAllFileByChatId(chatId: number) {
          const images = await this.fileRepository.findAll({where: {chatId}})
          return images;
      }
}
