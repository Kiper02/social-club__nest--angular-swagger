import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { Role } from 'src/role/role.model';
import { UserRole } from 'src/role/user-role.model';
import { RoleModule } from 'src/role/role.module';
import { FileModule } from 'src/file/file.module';
import { Chat } from 'src/chat/chat.model';
import { ChatParticipants } from 'src/chat/chat-user.model';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRole, Chat, ChatParticipants]),
    RoleModule,
    FileModule
  ]
})
export class UserModule {}
