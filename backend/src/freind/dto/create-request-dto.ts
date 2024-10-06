import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateRequestDto {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор добавляющего пользователя'})
    @IsNumber({}, {message: 'Должно быть числом'})
    userId: number;

    @ApiProperty({example: '1', description: 'Уникальный идентификатор добавляемого пользователя'})
    @IsNumber({}, {message: 'Должно быть числом'})
    freindId: number;
}