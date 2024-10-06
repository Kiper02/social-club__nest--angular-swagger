import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Length } from "class-validator";

export class AddToFreindsDto {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор добавляющего пользователя'})
    @IsNumber({}, {message: 'Должно быть числом'})
    userId: number;

    @ApiProperty({example: '1', description: 'Уникальный идентификатор добавляемого пользователя'})
    @IsNumber({}, {message: 'Должно быть числом'})
    freindId: number;

    @ApiProperty({example: 'pending', description: 'Статус заявки'})
    @IsString({message: 'Должно быть строкой'})
    @Length(3, 15, {message: 'Не менее 3 и не более 15 символов'})
    status: string;
}