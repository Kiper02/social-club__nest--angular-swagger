import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Chat } from "src/chat/chat.model";
import { Message } from "src/message/message.model";



@Table({tableName: 'file'})
export class File extends Model<File> {
    @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true})
    id: number;


    @Column({type: DataType.STRING, allowNull: false})
    file: string;

    @ForeignKey(() => Message)
    @Column({type: DataType.INTEGER, allowNull: false})
    messageId: number;

    @ForeignKey(() => Chat)
    @Column({type: DataType.INTEGER, allowNull: false})
    chatId: number;

    @BelongsTo(() => Message)
    message: Message

    @BelongsTo(() => Chat)
    chat: Chat
}