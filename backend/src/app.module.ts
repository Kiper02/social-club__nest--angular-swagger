import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/user.model';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { FileService } from './file/file.service';
import { FileModule } from './file/file.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { RoleModule } from './role/role.module';
import { Role } from './role/role.model';
import { UserRole } from './role/user-role.model';
import { ChatModule } from './chat/chat.module';
import { Chat } from './chat/chat.model';
import { ChatParticipants } from './chat/chat-user.model';
import { MessageModule } from './message/message.module';
import { File } from './file/file.model';
import { Message } from './message/message.model';

@Module({
  controllers: [AppController],
  providers: [AppService, FileService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    UserModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [User, Role, UserRole, Chat, ChatParticipants, File, Message],
      autoLoadModels: true
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static')
    }),
    FileModule,
    AuthModule,
    RoleModule,
    ChatModule,
    MessageModule,
  ],
})
export class AppModule {}


