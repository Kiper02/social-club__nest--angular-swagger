import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/user/user.model';
import { Chat } from './chat.model';

@Table({ tableName: 'chatParticipants' })
export class ChatParticipants extends Model<ChatParticipants> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @ForeignKey(() => Chat)
  @Column({ type: DataType.INTEGER, allowNull: false })
  chatId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Chat)
  chat: Chat;
}
