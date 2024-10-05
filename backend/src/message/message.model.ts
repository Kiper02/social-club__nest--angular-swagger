import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Chat } from "src/chat/chat.model";
import { File } from "src/file/file.model";
import { User } from "src/user/user.model";



@Table({tableName: 'message'})
export class Message extends Model<Message> {
    @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.TEXT, allowNull: false})
    text: string;

    @ForeignKey(() => Chat)
    @Column({type: DataType.INTEGER, allowNull: false})
    chatId: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    userId: number;

    @HasMany(() => File)
    files: File[]

    @BelongsTo(() => Chat)
    chat: Chat
}