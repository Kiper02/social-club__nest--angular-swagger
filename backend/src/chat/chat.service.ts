import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Chat } from './chat.model';
import { CreateChatDto } from './dto/create-chat-dto';
import { User } from 'src/user/user.model';
import { AddUserInChatDto } from './dto/addUserInChat-dto';
import { RemoveChatDto } from './dto/remove-chat-dto';
import { Message } from 'src/message/message.model';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat) private chatRepository: typeof Chat,
    @InjectModel(User) private userRepository: typeof User,
  ) {}

  async create(createChatDto: CreateChatDto) {
    const chat = await this.chatRepository.create(createChatDto);
    return chat;
  }

  async getChatsUser(id: number) {
    const chats = await this.chatRepository.findAll({ where: { id } });
    return chats;
  }

  async removeChat(removeChatDto: RemoveChatDto) {
    const chat = await this.chatRepository.findOne({
      where: { id: removeChatDto.id },
    });
    if (!chat) {
      throw new HttpException(
        'Чата с таким id не существует',
        HttpStatus.NOT_FOUND,
      );
    }
    await this.chatRepository.destroy({ where: { id: removeChatDto.id } });
    return {
      statusCode: HttpStatus.OK,
      message: 'Чат удален',
    };
  }

  async addUserInChat(addUserInChat: AddUserInChatDto) {
    const user = await this.userRepository.findByPk(addUserInChat.id);
    if (!user) {
      throw new HttpException(
        'Пользователя с таким id не существует',
        HttpStatus.NOT_FOUND,
      );
    }
    await user.$set('chats', [user.id]);
    return {
      statusCode: HttpStatus.OK,
      message: 'Пользователь добавлен в чат',
    };
  }

  async getLastMessage(chatId: number) {
    const chat = await this.chatRepository.findByPk(chatId);
    if (!chat) {
      throw new HttpException(
        'Чата с таким id не существует',
        HttpStatus.NOT_FOUND,
      );
    }
    const messages = await this.chatRepository.findAll({
      include: [{
        model: Message
      }]
    })
    return messages; // последнее сообщение в чате
  }
}
