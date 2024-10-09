import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ChatParticipants } from 'src/chat/chat-user.model';
import { Chat } from 'src/chat/chat.model';
import { FreindRequest } from 'src/freind/freind-request.model';
import { Freind } from 'src/freind/freind.model';
import { Role } from 'src/role/role.model';
import { UserRole } from 'src/role/user-role.model';

@Table({ tableName: 'user' })
export class User extends Model<User> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 'Иванов', description: 'Фамилия' })
  @Column({ type: DataType.STRING, allowNull: false })
  surname: string;

  @ApiProperty({ example: 'Иван', description: 'Имя' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ example: 'Иванович', description: 'Отчество' })
  @Column({ type: DataType.STRING, allowNull: false })
  patronymic: string;

  @ApiProperty({ example: 'examplePassword', description: 'Пароль' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({
    example: 'exampleemail@mail.ru',
    description: 'Почтовый адрес',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  email: string;

  @ApiProperty({ example: 'avatar.jpg', description: 'Изображение профиля' })
  @Column({ type: DataType.STRING, allowNull: false })
  avatar: string;

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];

  @BelongsToMany(() => Chat, () => ChatParticipants)
  chats: Chat[];

  @HasMany(() => Freind)
  freinds: Freind[];

  @HasMany(() => FreindRequest, { foreignKey: 'userId' })
  sentFreindRequests: FreindRequest[];

  @HasMany(() => FreindRequest, { foreignKey: 'recipientId' })
  receivedFreindRequests: FreindRequest[];

  async addChat(chat: Chat) {
    await this.$add('chats', chat);
  }
}
