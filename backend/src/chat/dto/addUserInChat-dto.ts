import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class AddUserInChatDto {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор пользователя'})
    @IsNumber({}, {message: 'Должно быть числом'})
    userId: number;

    @ApiProperty({example: '1', description: 'Уникальный идентификатор чата'})
    @IsNumber({}, {message: 'Должно быть числом'})
    chatId: number;
}