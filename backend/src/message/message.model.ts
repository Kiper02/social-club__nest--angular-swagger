import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Chat } from "src/chat/chat.model";
import { File } from "src/file/file.model";
import { User } from "src/user/user.model";



@Table({tableName: 'message'})
export class Message extends Model<Message> {

    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Привет', description: 'Текст сообщения'})
    @Column({type: DataType.TEXT, allowNull: false})
    text: string;

    @ApiProperty({example: '1', description: 'Уникальный идентификатор чата'})
    @ForeignKey(() => Chat)
    @Column({type: DataType.INTEGER, allowNull: false})
    chatId: number;

    @ApiProperty({example: '1', description: 'Уникальный идентификатор пользователя'})
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    userId: number;

    @HasMany(() => File)
    files: File[]

    @BelongsTo(() => Chat)
    chat: Chat

    @BelongsTo(() => User)
    user: User;
}