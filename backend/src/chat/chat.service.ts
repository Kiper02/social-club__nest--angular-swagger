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
    await this.chatParticipantsRepository.create({
      userId: createChatDto.userId,
      chatId: chat.id,
    });
    return chat;
  }
  



async getChatsUser(id: number) {
  let chats = await this.chatRepository.findAll({
    subQuery: false,
    include: [
      {
        model: User,
        where: { id },
        // through: { attributes: [] },
        // required: true,
        include: [
          {
            model: Freind,
            as: 'freinds',
          },
        ],
      },
      {
        model: ChatParticipants,
        include: [
          {
            model: User,
            as: 'user',
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

  async addUserInChat(addUserInChatDto: AddUserInChatDto) {
    // Проверка существования пользователя
    const user = await this.userRepository.findByPk(addUserInChatDto.userId);
    if (!user) {
        throw new HttpException(
            'Пользователя с таким id не существует',
            HttpStatus.NOT_FOUND,
        );
    }

    // Проверка существования чата
    const chat = await this.chatRepository.findByPk(addUserInChatDto.chatId);
    if (!chat) {
        throw new HttpException(
            'Чата с таким id не существует',
            HttpStatus.NOT_FOUND,
        );
    }

    // Проверка, состоит ли пользователь в чате
    const isParticipant = await this.chatParticipantsRepository.findOne({
        where: {
            userId: addUserInChatDto.userId,
            chatId: addUserInChatDto.chatId,
        },
    });

    if (isParticipant) {
        throw new HttpException(
            'Пользователь уже добавлен в этот чат',
            HttpStatus.BAD_REQUEST,
        );
    }

    // Добавляем нового участника в чат
    await this.chatParticipantsRepository.create({
        userId: addUserInChatDto.userId,
        chatId: addUserInChatDto.chatId,
    });

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

  async getCommonChat(userId: number, freindId: number) {
    const chat = this.chatRepository.findOne({where: {userId, }})
  }
}
