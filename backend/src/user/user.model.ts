import { Column, DataType, Model, Table } from "sequelize-typescript";



@Table({tableName: 'user'})
export class User extends Model<User> {
    @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    surname: string;

    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @Column({type: DataType.STRING, allowNull: false})
    patronymic: string;

    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @Column({type: DataType.STRING, allowNull: false})
    email: string;

    @Column({type: DataType.STRING, allowNull: false})
    avatar: string;

    @Column({type: DataType.ARRAY(DataType.STRING), defaultValue: ['USER']})
    roles: Array<String>
}