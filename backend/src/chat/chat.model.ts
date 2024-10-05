import { BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { User } from "src/user/user.model";
import { ChatParticipants } from "./chat-user.model";
import { Message } from "src/message/message.model";
import { File } from "src/file/file.model";



@Table({tableName: 'chat'})
export class Chat extends Model<Chat> {
    @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @Column({type: DataType.BOOLEAN, defaultValue: false})
    isGroup: boolean;

    @ForeignKey(() => Message)
    last_message_id: number;

    @BelongsToMany(() => User, () => ChatParticipants)
    users: [User]

    @HasMany(() => File)
    files: File[]

    @HasMany(() => Message)
    messages: Message[]
}