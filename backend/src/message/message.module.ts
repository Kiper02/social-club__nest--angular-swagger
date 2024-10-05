import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Message } from './message.model';
import { Chat } from 'src/chat/chat.model';
import { File } from 'src/file/file.model';
import { User } from 'src/user/user.model';
import { FileModule } from 'src/file/file.module';

@Module({
  controllers: [MessageController],
  providers: [MessageService],
  imports: [
    SequelizeModule.forFeature([Message, Chat, File, User]),
    FileModule
  ],
})
export class MessageModule {}
