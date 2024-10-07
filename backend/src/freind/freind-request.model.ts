// import { ApiProperty } from "@nestjs/swagger";
// import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
// import { User } from "src/user/user.model";

// @Table({tableName: 'freindRequest'})
// export class FreindRequest extends Model<FreindRequest> {
//     @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
//     @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true})
//     id: number;

//     @ApiProperty({example: '1', description: 'Уникальный идентификатор добавляемого пользователя'})
//     @Column({type: DataType.INTEGER, allowNull: false})
//     freindId: number

//     @ApiProperty({example: 'pending', description: 'Статус заявки'})
//     @Column({type: DataType.STRING, defaultValue: 'pending'})
//     status: string

//     @ForeignKey(() => User)
//     @ApiProperty({example: '1', description: 'Уникальный идентификатор добавляющего пользователя'})
//     @Column({type: DataType.INTEGER, allowNull: false})
//     userId: number

//     @BelongsTo(() => User)
//     user: User;
// }
import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/user/user.model";

@Table({tableName: 'freindRequest'})
export class FreindRequest extends Model<FreindRequest> {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: '1', description: 'Уникальный идентификатор добавляемого пользователя'})
    @Column({type: DataType.INTEGER, allowNull: false})
    freindId: number;

    @ApiProperty({example: 'pending', description: 'Статус заявки'})
    @Column({type: DataType.STRING, defaultValue: 'pending'})
    status: string;

    @ForeignKey(() => User)
    @ApiProperty({example: '1', description: 'Уникальный идентификатор добавляющего пользователя'})
    @Column({type: DataType.INTEGER, allowNull: false})
    userId: number;

    @BelongsTo(() => User)
    user: User;

    // Добавляем связь для получателя заявки
    @ForeignKey(() => User)
    @ApiProperty({example: '2', description: 'Уникальный идентификатор пользователя, которому адресована заявка'})
    @Column({type: DataType.INTEGER, allowNull: false})
    recipientId: number;

    @BelongsTo(() => User, { foreignKey: 'recipientId' })
    recipient: User;
}
