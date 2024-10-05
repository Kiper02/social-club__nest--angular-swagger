import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, MinLength } from "class-validator";

export class CreateMessageDto {
    @ApiProperty({example: 'Привет', description: 'Текст сообщения'})
    @IsString({message: 'Должно быть строкой'})
    @MinLength(1, {message: 'Не менее 1 символа'})
    text: string;

    @ApiProperty({example: '1', description: 'Уникальный идентификатор чата'})
    @IsNumber({}, {message: 'Должно быть числом'})
    chatId: number;

    @ApiProperty({example: '1', description: 'Уникальный идентификатор пользователя'})
    @IsNumber({}, {message: 'Должно быть числом'})
    userId: number;

}