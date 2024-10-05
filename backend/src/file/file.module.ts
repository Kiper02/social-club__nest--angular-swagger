import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Message } from 'src/message/message.model';
import { File } from './file.model';
import { FileController } from './file.controller';
import { Chat } from 'src/chat/chat.model';

@Module({
    providers: [FileService],
    exports: [FileService],
    imports: [
        SequelizeModule.forFeature([File, Message, Chat])
    ],
    controllers: [FileController]
})
export class FileModule {}
