import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/user/user.model";
import { Role } from "./role.model";



@Table({tableName: 'user_role', createdAt: false, updatedAt: false})
export class UserRole extends Model<UserRole> {
    @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Role)
    @Column({type: DataType.INTEGER, allowNull: false, unique: true})
    roleId: number;

    @ForeignKey(() => User)
    @Column({type: DataType.STRING, allowNull: false})
    userId: number;
}