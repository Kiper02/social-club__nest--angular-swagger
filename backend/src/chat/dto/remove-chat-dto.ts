import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class RemoveChatDto {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @IsNumber({}, { message: 'Должно быть числом' })
  id: number;
}
