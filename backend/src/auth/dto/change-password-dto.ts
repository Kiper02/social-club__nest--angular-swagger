import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class ChangePasswordDto {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор пользователя'})
    @IsNumber({}, {message: 'Должно быть числом'})
    userId: number;

    @ApiProperty({example: 'examplePassword', description: 'Старый пароль'})
    @IsString({message: 'Должно быть строкой'})
    oldPassword: string;

    @ApiProperty({example: 'examplePasswordNew', description: 'Новый пароль'})
    @IsString({message: 'Должно быть строкой'})
    newPassword: string;
}