import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Chat } from './chat.model';
import { CreateChatDto } from './dto/create-chat-dto';
import { User } from 'src/user/user.model';
import { AddUserInChatDto } from './dto/addUserInChat-dto';
import { RemoveChatDto } from './dto/remove-chat-dto';
import { Message } from 'src/message/message.model';
import { Op } from 'sequelize';
import { ChatParticipants } from './chat-user.model';
import { Freind } from 'src/freind/freind.model';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat) private chatRepository: typeof Chat,
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(Message) private messageRepository: typeof Message,
    @InjectModel(ChatParticipants)
    private chatParticipantsRepository: typeof ChatParticipants,
  ) {}

  async create(createChatDto: CreateChatDto) {
    const user = await this.userRepository.findOne({
      where: { id: createChatDto.userId },
    });
    if (!user) {
      throw new HttpException(
        'Пользователь с таким id не найден',
        HttpStatus.NOT_FOUND,
      );
    }
    const chat = await this.chatRepository.create(createChatDto);
    return chat;
  }

  async getChatsUser(id: number) {
    let chats = await this.chatRepository.findAll({
      include: [
        {
          model: User,
          where: { id },
          through: { attributes: [] },
          required: true,
          include: [
            {
              model: Freind,
              as: 'freinds',
            },
          ],
        },
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
    const user = await this.userRepository.findByPk(addUserInChat.userId);
    if (!user) {
      throw new HttpException(
        'Пользователя с таким id не существует',
        HttpStatus.NOT_FOUND,
      );
    }

    const chat = await this.chatRepository.findByPk(addUserInChat.chatId);
    if (!chat) {
      throw new HttpException(
        'Чата с таким id не существует',
        HttpStatus.NOT_FOUND,
      );
    }

    const isParticipant = await this.chatParticipantsRepository.findOne({
      where: { userId: addUserInChat.userId, chatId: addUserInChat.chatId },
    });

    console.log(isParticipant);

    if (isParticipant) {
      throw new HttpException(
        'Пользователь уже добавлен в этот чат',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Добавляем запись в таблицу chatParticipants
    const participant = await this.chatParticipantsRepository.create({
      userId: addUserInChat.userId,
      chatId: addUserInChat.chatId,
    });
    // Проверяем добавление участника
    console.log('Пользователь добавлен в чат:', participant);
    return {
      statusCode: HttpStatus.OK,
      message: 'Пользователь добавлен в чат',
    };
  }

  async getOneChat(id: number) {
    const chat = await this.chatRepository.findOne({ where: { id } });
    return chat;
  }

  async getAllChatParticipantsByUser(userId: number) {
    const chatParticipants = await this.chatParticipantsRepository.findAll({
      where: { userId },
    });
    return chatParticipants;
  }

  async getAllChatParticipants(chatId: number) {
    const participants = await this.chatParticipantsRepository.findAll({
      where: { chatId },
      include: [{ model: User }],
    });
    return participants;
  }
}
