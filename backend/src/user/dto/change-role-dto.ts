import { ApiProperty } from "@nestjs/swagger";

export class ChangeRoleDto {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    id: number;
    @ApiProperty({example: 'ADMIN', description: 'Статус роли'})
    role: string;
}