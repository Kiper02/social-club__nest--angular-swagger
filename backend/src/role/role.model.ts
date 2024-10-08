import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/user/user.model';
import { UserRole } from './user-role.model';
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 'role' })
export class Role extends Model<Role> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 'ADMIN', description: 'Роль' })
  @Column({ type: DataType.STRING, defaultValue: 'USER' })
  value: string;

  @ApiProperty({ example: 'Администратор', description: 'Описание роли' })
  @Column({ type: DataType.STRING, defaultValue: 'ПОЛЬЗОВАТЕЛЬ' })
  description: string;

  @BelongsToMany(() => User, () => UserRole)
  users: User[];
}
