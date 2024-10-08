import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Иванов', description: 'Фамилия' })
  @IsString({ message: 'Должно быть строкой' })
  surname: string;

  @ApiProperty({ example: 'Иван', description: 'Имя' })
  @IsString({ message: 'Должно быть строкой' })
  name: string;

  @ApiProperty({ example: 'Иванович', description: 'Отчество' })
  @IsString({ message: 'Должно быть строкой' })
  patronymic: string;

  @ApiProperty({ example: 'examplePassword', description: 'Пароль' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(5, 30, { message: 'Не менее 5 и не более 30 символов' })
  password: string;

  @IsString({ message: 'Должно быть строкой' })
  @ApiProperty({
    example: 'exampleemail@mail.ru',
    description: 'Почтовый адрес',
  })
  @IsEmail({}, { message: 'Некорректный email' })
  email: string;
}
