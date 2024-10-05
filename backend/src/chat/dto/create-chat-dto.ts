import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString, Length } from "class-validator";

export class CreateChatDto {
    @ApiProperty({example: 'чат группы', description: 'Название чата'})
    @IsString({message: 'Должно быть строкой'})
    @Length(3, 20, {message: 'Не менее 3 и не более 20 символов'})
    name: string;

    @ApiProperty({example: 'чат группы', description: 'Название чата'})
    @IsBoolean({message: 'Должно быть булевым значением'})
    isGroup: boolean;
}