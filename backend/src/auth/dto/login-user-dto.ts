import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class LoginUserDto {
    @ApiProperty({example: 'exampleemail@mail.ru', description: 'Почтовый адрес'})
    @IsString({message: 'Должно быть строкой'})
    @IsEmail({}, {message: 'Некорректный email'})
    email: string;

    @ApiProperty({example: 'examplePassword', description: 'Пароль'})
    @IsString({message: 'Должно быть строкой'})
    @Length(5, 30, {message: 'Не менее 5 и не более 30 символов'})
    password: string;
}