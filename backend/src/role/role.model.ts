import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "src/user/user.model";
import { UserRole } from "./user-role.model";



@Table({tableName: 'role'})
export class Role extends Model<Role> {
    @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, defaultValue: 'USER'})
    value: string;

    @Column({type: DataType.STRING, defaultValue: 'ПОЛЬЗОВАТЕЛЬ'})
    description: string;


    @BelongsToMany(() => User, () => UserRole)
    users: User[]
}