import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: 'ADMIN', description: 'Роль' })
  @IsString({ message: 'Должно быть строкой' })
  value: string;

  @ApiProperty({ example: 'Администратор', description: 'Описание роли' })
  @IsString({ message: 'Должно быть строкой' })
  description: string;
}
