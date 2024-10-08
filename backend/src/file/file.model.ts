import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Chat } from 'src/chat/chat.model';
import { Message } from 'src/message/message.model';

@Table({ tableName: 'file' })
export class File extends Model<File> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 'avatar.jpg', description: 'Изображение' })
  @Column({ type: DataType.STRING, allowNull: false })
  file: string;

  @ApiProperty({
    example: '1',
    description: 'Уникальный идентификатор сообщения',
  })
  @ForeignKey(() => Message)
  @Column({ type: DataType.INTEGER, allowNull: false })
  messageId: number;

  @ApiProperty({ example: '1', description: 'Уникальный идентификатор чата' })
  @ForeignKey(() => Chat)
  @Column({ type: DataType.INTEGER, allowNull: false })
  chatId: number;

  @BelongsTo(() => Message)
  message: Message;

  @BelongsTo(() => Chat)
  chat: Chat;
}
