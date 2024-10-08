import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Chat } from './chat.model';
import { User } from 'src/user/user.model';
import { ChatParticipants } from './chat-user.model';
import { Message } from 'src/message/message.model';

@Module({
  controllers: [ChatController],
  providers: [ChatService],
  imports: [
    SequelizeModule.forFeature([Chat, User, ChatParticipants, Message]),
  ],
})
export class ChatModule {}
