import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ChangeAvatarDto {
  @ApiProperty({
    example: '1',
    description: 'Уникальный иднтификатор пользователя',
  })
  @IsNumber({}, { message: 'Должно быть числом' })
  userId: number;
}
