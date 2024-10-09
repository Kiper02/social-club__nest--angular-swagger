import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as multer from 'multer';
import { File } from 'src/file/file.model';
import { EFileType, FileService } from 'src/file/file.service';
import { Message } from './message.model';
import { CreateMessageDto } from './dto/create-message-dto';
import { Chat } from 'src/chat/chat.model';
import { User } from 'src/user/user.model';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(File) private fileRepository: typeof File,
    @InjectModel(Message) private messageRepository: typeof Message,
    @InjectModel(Chat) private chatRepository: typeof Chat,
    @InjectModel(User) private userRepository: typeof User,
    private fileService: FileService,
  ) {}

  async createMessage(createMessageDto: CreateMessageDto) {
    const message = await this.messageRepository.create(createMessageDto);
    const chat = await this.chatRepository.findOne({
      where: { id: createMessageDto.chatId },
    });
    await chat.update({ lastMessageId: message.id });
    const messageWithUser = await this.messageRepository.findOne({
      where: { id: message.id },
      include: [
        {
          model: User,
          as: 'user',
          required: true,
        },
      ],
    });
    return messageWithUser;
  }

  async getMessagesByChatId(chatId: number) {
    const messages = await this.messageRepository.findAll({
      where: { chatId },
      include: [
        {
          model: User,
          as: 'user',
          required: true,
        },
        {
          model: File,
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    return messages;
  }

  async createFile(messageId: number, chatId: number, file: multer.File) {
    console.log(chatId);
    const fileName = await this.fileService.saveFile(file, EFileType.IMAGE);
    const image = await this.fileRepository.create({
      messageId,
      chatId,
      file: fileName,
    });
    return image;
  }

  async getFileOneByMessageId(messageId: number) {
    const image = await this.fileRepository.findOne({ where: { messageId } });
    return image;
  }

  async getAllFileByChatId(chatId: number) {
    const images = await this.fileRepository.findAll({ where: { chatId } });
    return images;
  }
}
