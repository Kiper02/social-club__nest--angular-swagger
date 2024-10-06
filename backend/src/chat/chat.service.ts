import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Chat } from './chat.model';
import { CreateChatDto } from './dto/create-chat-dto';
import { User } from 'src/user/user.model';
import { AddUserInChatDto } from './dto/addUserInChat-dto';
import { RemoveChatDto } from './dto/remove-chat-dto';
import { Message } from 'src/message/message.model';
import { Op } from 'sequelize';
import sequelize from 'sequelize';


@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat) private chatRepository: typeof Chat,
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(Message) private messageRepository: typeof Message
  ) {}

  async create(createChatDto: CreateChatDto) {
    const user = await this.userRepository.findOne({where: {id: createChatDto.userId}})
    if(!user) {
      throw new HttpException('Пользователь с таким id не найден', HttpStatus.NOT_FOUND);
    }
    const chat = await this.chatRepository.create(createChatDto);
    return chat;
  }

  async getChatsUser(id: number) {
    let chats = await this.chatRepository.findAll({
      where: { userId: id },
      include: [
        {
          model: Message,
          required: false, 
        where: { id: { [Op.col]: 'Chat.lastMessageId' } },
        },
      ],
    });
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
}
