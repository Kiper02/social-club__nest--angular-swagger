import { BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { User } from "src/user/user.model";
import { ChatParticipants } from "./chat-user.model";
import { Message } from "src/message/message.model";
import { File } from "src/file/file.model";
import { ApiProperty } from "@nestjs/swagger";



@Table({tableName: 'chat'})
export class Chat extends Model<Chat> {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Чат группы', description: 'Название чата'})
    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @ApiProperty({example: true, description: 'Флаг, определяющий является ли чат групповым'})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    isGroup: boolean;

    @ApiProperty({example: '1', description: 'Уникальный идентификатор пользователя создающего чат'})
    @Column({type: DataType.INTEGER, allowNull: false})
    userId: number

    @ApiProperty({example: 'Привет', description: 'Последнее сообщение в чате'})
    @ForeignKey(() => Message)
    @Column({type: DataType.INTEGER, allowNull: true})
    lastMessageId: number

    @BelongsToMany(() => User, () => ChatParticipants)
    users: User[]

    @HasMany(() => File)
    files: File[]

    @HasMany(() => Message)
    messages: Message[]
}